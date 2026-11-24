import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { editDiary } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Senang" },
  { emoji: "😢", label: "Sedih" },
  { emoji: "😡", label: "Kesal" },
  { emoji: "😌", label: "Tenang" },
];

export default function EditDiaryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  const [title, setTitle] = useState(entry?.title ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [mood, setMood] = useState(entry?.mood ?? "😊");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
      setMood(entry.mood);
    }
  }, [entry]);

  if (!entry) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const handleUpdate = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Validasi", "Judul dan isi wajib diisi.");
      return;
    }

    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul diary minimal 3 karakter.");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
      })
    );

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.formCard, SHADOW.card]}>
        <Text style={styles.label}>Judul Catatan</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Judul diary (minimal 3 karakter)"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />

        <Text style={styles.label}>Isi Cerita</Text>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Ceritakan harimu..."
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
        onPress={handleUpdate}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
      >
        <Ionicons name="save-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACE.l,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 16,
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