import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { ExerciseService } from 'services/exercise';

const QRCodeApp: React.FC = () => {
    const [base64String, setBase64String] = useState<string>('');
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [originalValue, setOriginalValue] = useState<number | null>(null); // Change to number type
    const [quizData, setQuizData] = useState<any | null>(null); // State for fetched quiz data
    const [error, setError] = useState<string | null>(null); // State for error message

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    
    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        setScannedData(data);
        const decodedValue = parseInt(atob(data), 10); // Decode and convert to integer
        setOriginalValue(decodedValue);

        const result = await ExerciseService.getQuizByIds(decodedValue); // Fetch quiz data by ID
        if (result.error) {
            setError(result.error.message); // Handle error if any
            setQuizData(null); // Reset quiz data on error
        } else {
            setQuizData(result.quiz); // Set quiz data if available
            setError(null); // Reset error
        }
    };

    return (
        <View style={{ padding: 20 }}>
            
            {qrImage && <Image source={{ uri: qrImage }} style={{ width: 200, height: 200, marginTop: 20 }} />}
            
            {hasPermission === null && <Text>Requesting for camera permission</Text>}
            {hasPermission === false && <Text>No access to camera</Text>}
            {hasPermission && (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
                        style={{ height: 400, width: 200, marginTop: 20 }}
                    />
                    {scannedData && (
                        <Button title={'Tap to Scan Again'} onPress={() => setScannedData(null)} />
                    )}
                    {originalValue !== null && <Text>Decoded Value: {originalValue}</Text>} {/* Displaying as number */}

                    {quizData && (
                        <View style={{ marginTop: 20 }}>
                            <Text>Quiz Data:</Text>
                            <Text>{JSON.stringify(quizData, null, 2)}</Text> {/* Print fetched quiz data */}
                        </View>
                    )}
                    {error && <Text style={{ color: 'red' }}>Error: {error}</Text>} {/* Display error message if any */}
                </>
            )}
        </View>
    );
};

export default QRCodeApp;