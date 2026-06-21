import { useState, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe, withRepeat, withTiming, useSharedValue, withDelay, useAnimatedStyle } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const { width, height } = Dimensions.get('screen');
const DURATION = 800;

function Star({ star }: { star: { x: number; y: number; size: number; delay: number; duration: number } }) {
  const opacity = useSharedValue(0.3);
  opacity.value = withDelay(
    star.delay,
    withRepeat(withTiming(1, { duration: star.duration }), -1, true)
  );
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
        },
        style,
      ]}
    />
  );
}

function Stars() {
  const starData = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: ((i * 137.5) % width),
        y: ((i * 97.3) % height),
        size: 1 + ((i * 23.7) % 250) / 100,
        delay: ((i * 41.9) % 2000),
        duration: 1000 + ((i * 67.3) % 2000),
      });
    }
    return stars;
  }, []);

  return (
    <>
      {starData.map((star, i) => (
        <Star key={i} star={star} />
      ))}
    </>
  );
}

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      opacity: 1,
    },
    70: {
      opacity: 1,
    },
    100: {
      opacity: 0,
    },
  });

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION + 600).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.backgroundSolidColor}
    >
      <Stars />
      <View style={styles.cosmicContainer}>
        <Animated.Text
          entering={new Keyframe({
            0: { opacity: 0, transform: [{ scale: 0.5 }] },
            50: { opacity: 1, transform: [{ scale: 1.1 }], easing: Easing.elastic(0.7) },
            100: { opacity: 1, transform: [{ scale: 1 }] },
          }).duration(DURATION)}
          style={styles.cosmicSymbol}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          entering={new Keyframe({
            0: { opacity: 0, transform: [{ translateY: 20 }] },
            60: { opacity: 1, transform: [{ translateY: 0 }], easing: Easing.elastic(0.7) },
            100: { opacity: 1, transform: [{ translateY: 0 }] },
          }).duration(DURATION)}
          style={styles.cosmicTitle}
        >
          COSMIC
        </Animated.Text>
        <Animated.Text
          entering={new Keyframe({
            0: { opacity: 0, transform: [{ translateY: 20 }] },
            70: { opacity: 1, transform: [{ translateY: 0 }], easing: Easing.elastic(0.7) },
            100: { opacity: 1, transform: [{ translateY: 0 }] },
          }).duration(DURATION)}
          style={styles.cosmicSubtitle}
        >
          ORACLE
        </Animated.Text>
        <Animated.Text
          entering={new Keyframe({
            0: { opacity: 0 },
            80: { opacity: 0 },
            100: { opacity: 0.6, easing: Easing.elastic(0.7) },
          }).duration(DURATION)}
          style={styles.cosmicTagline}
        >
          Your Spiritual Intelligence Platform
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

export function AnimatedIcon() {
  return null;
}

const styles = StyleSheet.create({
  backgroundSolidColor: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    backgroundColor: '#0a0a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  cosmicContainer: {
    alignItems: 'center',
    gap: 8,
  },
  cosmicSymbol: {
    fontSize: 48,
    color: '#fbbf24',
    marginBottom: 8,
  },
  cosmicTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 8,
    textShadowColor: 'rgba(147, 51, 234, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  cosmicSubtitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#c084fc',
    letterSpacing: 12,
    textShadowColor: 'rgba(147, 51, 234, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  cosmicTagline: {
    fontSize: 13,
    color: '#a78bfa',
    letterSpacing: 3,
    marginTop: 16,
    textTransform: 'uppercase',
  },
});
