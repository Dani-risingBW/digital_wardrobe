import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '../src/theme';

type TagChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export function TagChip({ label, selected = false, onPress }: TagChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selectedChip,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.sm,
    marginRight: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selectedChip: {
    backgroundColor: colors.olive,
    borderColor: colors.olive,
  },
  label: {
    color: colors.charcoal,
    fontSize: 13,
    fontWeight: '600',
  },
  selectedLabel: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.72,
  },
});
