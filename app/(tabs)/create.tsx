import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../src/app/hooks";
import { addDiary } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Senang" },
  { emoji: "😢", label: "Sedih" },
  { emoji: "😡", label: "Kesal" },
  { emoji: "😌", label: "Tenang" },
];

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");

  const saveDiary = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Validasi", "Judul dan isi wajib diisi.");
      return;
    }

    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul diary minimal 3 karakter.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    dispatch(
      addDiary({
        title: title.trim(),
        date: today,
        preview: body.trim().slice(0, 100),
        body: body.trim(),
        mood,
      })
    );

    setTitle("");
    setBody("");
    setMood("😊");

    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Tulis Cerita Baru</Text>
        <Text style={styles.heading}>Tambah Diary</Text>

        <View style={[styles.formCard, SHADOW.card]}>
          <Text style={styles.label}>Judul Catatan</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Contoh: Hari Produktif di Kampus"
            placeholderTextColor={COLORS.muted}
            style={styles.input}
          />

          <Text style={styles.label}>Isi Cerita</Text>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Ceritakan pengalaman atau perasaanmu hari ini..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={[styles.input, styles.bodyInput]}
          />

          <Text style={styles.label}>Suasana Hati</Text>
          <View style={styles.moodRow}>
            {MOOD_OPTIONS.map((item) => {
              const active = mood === item.emoji;
              return (
                <Pressable
                  key={item.emoji}
                  onPress={() => setMood(item.emoji)}
                  style={[
                    styles.moodButton,
                    active && styles.selectedMood,
                  ]}
                >
                  <Text style={styles.mood}>{item.emoji}</Text>
                  <Text
                    style={[
                      styles.moodLabel,
                      active && styles.moodLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={saveDiary}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Simpan Diary</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACE.l,
  },
  subtitle: {
    fontSize: TYPO.caption,
    color: COLORS.accent,
    fontWeight: "600",
    marginBottom: 2,
  },
  heading: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.l,
  },
  label: {
    fontSize: TYPO.caption,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: 12,
    backgroundColor: COLORS.background,
    color: COLORS.text,
    fontSize: TYPO.body,
    marginBottom: SPACE.m,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    alignItems: "center",
    gap: 4,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1.5,
  },
  mood: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: "600",
  },
  moodLabelActive: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  button: {
    flexDirection: "row",
    gap: 8,
    padding: 15,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});