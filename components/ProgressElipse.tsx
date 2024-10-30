import React, { useRef, useEffect } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export const CircularProgress = ({ percentage = 75, radius = 74, strokeWidth = 8 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [percentage]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {/* Fondo circular blanco */}
        <Circle
          stroke="#FFFFFF"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Círculo verde para representar el progreso */}
        <AnimatedCircle
          stroke="#3aa66a"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [circumference, offset],
          })}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.percentageTextContainer}>
        <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  percentageTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -10 }],
  },
  percentageText: {
    fontSize: 18,
    color: '#3aa66a',
    fontWeight: 'bold',
  },
});

