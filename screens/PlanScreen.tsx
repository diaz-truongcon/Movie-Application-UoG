import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../firebaseFirestore';
import { Buffer } from 'buffer';

type Plan = {
    id: string;
    title: string;
    pricePerMonth: string;
};

const PlanScreen = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            const querySnapshot = await getDocs(collection(db, 'Plans'));
            const plansData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                pricePerMonth: doc.data().pricePerMonth,
            }));
            setPlans(plansData);
        };

        fetchPlans();
    }, []);

    const handleSelectPlan = (id: string) => {
        setSelectedPlan(id);
    };

    const handleContinue = async () => {
        if (!selectedPlan) return;

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');

            const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
            if (!selectedPlanDetails) throw new Error('Plan not found');

            // Step 1: Get Access Token
            const tokenResponse = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(
                        'AeyFK0Tomu06wnDGB4dmS3LMICoI_YezaWZBdHy6upiZ3S1YBDbmeJdKEQG2hXKnNf-XYcCE2lOgpVd2:EGAT2t45s_W_D3vF73RkfG_TJcGKg1FeBoLeygeexDcokCNYXeLPmxqQSJ3Tba7WA3CwzW80rZnQ8-Uj'
                    ).toString('base64')}`,
                },
                body: 'grant_type=client_credentials',
            });

            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setFullYear(startDate.getFullYear() + 1);

            await addDoc(collection(db, 'Subscriptions'), {
                idUser: user.email,
                paymentMethod: 'PayPal', 
                plan: selectedPlan, 
                price: parseFloat(selectedPlanDetails.pricePerMonth),
                startDate: startDate.toISOString(),
                expiryDate: expiryDate.toISOString(),
                transactionId: Math.random().toString(36).substring(2, 15),
            });

            Alert.alert('Đang tạo đơn thanh toán! Tiếp tục');

            // Step 2: Create Payment
            const paymentResponse = await fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    intent: 'sale',
                    payer: {
                        payment_method: 'paypal',
                    },
                    transactions: [
                        {
                            amount: {
                                currency: 'USD',
                                total: Math.round(selectedPlanDetails.pricePerMonth / 24000),
                            },
                            description: `Payment for ${selectedPlanDetails.title}`,
                        },
                    ],
                    redirect_urls: {
                        return_url: 'https://yourapp.com/return',
                        cancel_url: 'https://yourapp.com/cancel',
                    },
                }),
            });

            const paymentData = await paymentResponse.json();
            const approvalUrl = paymentData.links.find((link: any) => link.rel === 'approval_url').href;

            // Open the PayPal approval URL in the default browser
            Linking.openURL(approvalUrl).catch(err => console.error('Failed to open URL:', err));

        } catch (error) {
            console.error('Error processing PayPal payment:', error);
            Alert.alert('Failed to process payment. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Chọn gói Galaxy Play</Text>
            <FlatList
                data={plans}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.planItem,
                            selectedPlan === item.id && styles.selectedPlanItem
                        ]}
                        onPress={() => handleSelectPlan(item.id)}
                    >
                        <View style={styles.header}>
                            <Text style={styles.planTitle}>{item.title}</Text>
                            <Text style={styles.planPrice}>{item.pricePerMonth}/1 tháng</Text>
                        </View>
                        <View style={styles.features}>
                            <Text style={styles.feature}>✓ Không có quảng cáo</Text>
                            <Text style={styles.feature}>✓ Hỗ trợ đa nền tảng</Text>
                            <Text style={styles.feature}>✓ Toàn bộ đặc quyền gói Cao Cấp</Text>
                            <Text style={styles.feature}>✓ Xem không giới hạn kho phim</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    !selectedPlan && styles.disabledButton
                ]}
                disabled={!selectedPlan}
                onPress={handleContinue}
            >
                <Text style={styles.continueText}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    planItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedPlanItem: {
        borderColor: '#007bff',
        borderWidth: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    planPrice: {
        fontSize: 16,
        color: '#888',
    },
    features: {
        marginTop: 8,
    },
    feature: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    continueButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PlanScreen; 