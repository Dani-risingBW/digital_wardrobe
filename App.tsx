import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { TagChip } from './components/TagChip';
import { starterWardrobe } from './src/data';
import { Category, MVP_CATEGORIES, STYLE_TAGS, StyleTag, WardrobeItem } from './src/types';
import { colors, spacing } from './src/theme';

type Tab = 'home' | 'closet' | 'privacy';

const recommendationCopy = [
  { title: 'Soft structure', detail: 'Cream knit + olive wide-leg trousers', tag: 'Business professional' },
  { title: 'Easy movement', detail: 'A relaxed look for your next open afternoon', tag: 'Casual' },
  { title: 'Try something new', detail: 'A warm base with one polished layer', tag: 'Streetwear' },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(starterWardrobe);
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<WardrobeItem | null>(null);

  async function choosePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo access to add an item to your private closet.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]) {
      setDraft({
        id: `item-${Date.now()}`,
        name: 'New wardrobe item',
        category: 'Tops',
        styleTags: ['Casual'],
        imageUri: result.assets[0].uri,
        createdAt: new Date().toISOString(),
      });
    }
  }

  function saveDraft() {
    if (!draft) return;
    setWardrobe((current) => [draft, ...current]);
    setDraft(null);
    setIsAdding(false);
    setTab('closet');
  }

  function removeItem(id: string) {
    setWardrobe((current) => current.filter((item) => item.id !== id));
  }

  if (!isReady) {
    return <WelcomeScreen onContinue={() => setIsReady(true)} />;
  }

  if (isAdding) {
    return (
      <ReviewScreen
        draft={draft}
        onBack={() => {
          setDraft(null);
          setIsAdding(false);
        }}
        onChoosePhoto={choosePhoto}
        onSave={saveDraft}
        onUpdate={setDraft}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>OUTFITTED / LOCAL EDITION</Text>
            <Text style={styles.wordmark}>outfitted</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NI</Text>
          </View>
        </View>

        {tab === 'home' && <HomeScreen wardrobe={wardrobe} onAdd={() => setIsAdding(true)} />}
        {tab === 'closet' && (
          <ClosetScreen wardrobe={wardrobe} onAdd={() => setIsAdding(true)} onDelete={removeItem} />
        )}
        {tab === 'privacy' && <PrivacyScreen />}
      </ScrollView>
      <View style={styles.tabBar}>
        <TabButton label="Today" active={tab === 'home'} onPress={() => setTab('home')} />
        <TabButton label="My closet" active={tab === 'closet'} onPress={() => setTab('closet')} />
        <TabButton label="Privacy" active={tab === 'privacy'} onPress={() => setTab('privacy')} />
      </View>
    </SafeAreaView>
  );
}

function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const [name, setName] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [style, setStyle] = useState<StyleTag>('Casual');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.welcomeContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>OUTFITTED / LOCAL EDITION</Text>
        <Text style={styles.welcomeWordmark}>outfitted</Text>
        <View style={styles.welcomeHero}>
          <Text style={styles.heroKicker}>A CLOSET THAT LEARNS YOUR RHYTHM</Text>
          <Text style={styles.welcomeTitle}>Start with what you already love.</Text>
          <Text style={styles.heroBody}>Your first closet stays on this device while you explore the local MVP.</Text>
        </View>
        <Text style={styles.sectionLabel}>YOUR NAME</Text>
        <TextInput
          autoCapitalize="words"
          onChangeText={setName}
          placeholder="What should we call you?"
          placeholderTextColor={colors.muted}
          style={styles.textInput}
          value={name}
        />
        <Text style={styles.sectionLabel}>YOUR STARTING STYLE</Text>
        <View style={styles.chipWrap}>{STYLE_TAGS.slice(0, 4).map((tag) => <TagChip key={tag} label={tag} selected={style === tag} onPress={() => setStyle(tag)} />)}</View>
        <Pressable onPress={() => setAgeConfirmed((current) => !current)} style={styles.ageRow}>
          <View style={[styles.checkbox, ageConfirmed && styles.checkedBox]}>{ageConfirmed && <Text style={styles.checkmark}>✓</Text>}</View>
          <Text style={styles.ageText}>I confirm that I am 13 or older.</Text>
        </Pressable>
        <View style={styles.localNotice}><Text style={styles.localNoticeTitle}>Local-first by design</Text><Text style={styles.localNoticeBody}>Your name, preferences, and future wardrobe photos stay local in this development build.</Text></View>
        <Pressable disabled={!name.trim() || !ageConfirmed} onPress={onContinue} style={({ pressed }) => [styles.primaryButton, (!name.trim() || !ageConfirmed) && styles.disabledButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Create local closet</Text><Text style={styles.primaryButtonArrow}>→</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({ wardrobe, onAdd }: { wardrobe: WardrobeItem[]; onAdd: () => void }) {
  return (
    <View>
      <View style={styles.hero}>
        <Text style={styles.heroKicker}>THURSDAY / YOUR DAILY EDIT</Text>
        <Text style={styles.heroTitle}>Dress for the day you want.</Text>
        <Text style={styles.heroBody}>
          Three looks shaped by your closet, your rhythm, and what feels like you.
        </Text>
        <Pressable onPress={onAdd} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Add a clothing item</Text>
          <Text style={styles.primaryButtonArrow}>+</Text>
        </Pressable>
      </View>

      <SectionHeading title="Your edit" action="See all" />
      <View style={styles.recommendationList}>
        {recommendationCopy.map((recommendation, index) => (
          <View key={recommendation.title} style={styles.recommendationCard}>
            <View style={[styles.recommendationImage, index === 1 && styles.recommendationImageAlt]}>
              <Text style={styles.recommendationNumber}>0{index + 1}</Text>
              <Text style={styles.recommendationMark}>◌</Text>
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.cardEyebrow}>{recommendation.tag.toUpperCase()}</Text>
              <Text style={styles.cardTitle}>{recommendation.title}</Text>
              <Text style={styles.cardDetail}>{recommendation.detail}</Text>
              <View style={styles.feedbackRow}>
                <Text style={styles.feedbackText}>Like</Text>
                <Text style={styles.feedbackDivider}>·</Text>
                <Text style={styles.feedbackText}>Dislike</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.closetSummary}>
        <View>
          <Text style={styles.cardEyebrow}>PRIVATE CLOSET</Text>
          <Text style={styles.summaryTitle}>{wardrobe.length} pieces, all yours.</Text>
        </View>
        <Text style={styles.summaryArrow}>→</Text>
      </View>
    </View>
  );
}

function ClosetScreen({ wardrobe, onAdd, onDelete }: { wardrobe: WardrobeItem[]; onAdd: () => void; onDelete: (id: string) => void }) {
  return (
    <View>
      <View style={styles.pageIntro}>
        <Text style={styles.pageKicker}>THE COLLECTION</Text>
        <Text style={styles.pageTitle}>Your closet, in focus.</Text>
        <Text style={styles.pageBody}>Review every piece before it becomes part of your daily edit.</Text>
      </View>
      <View style={styles.filterRow}>
        <TagChip label="All pieces" selected onPress={() => undefined} />
        <TagChip label="Tops" onPress={() => undefined} />
        <TagChip label="Shoes" onPress={() => undefined} />
      </View>
      <Pressable onPress={onAdd} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
        <Text style={styles.secondaryButtonText}>+ Add another piece</Text>
      </Pressable>
      <View style={styles.grid}>
        {wardrobe.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemImageWrap}>
              {item.imageUri ? <Image source={{ uri: item.imageUri }} style={styles.itemImage} /> : <Text style={styles.itemPlaceholder}>✳</Text>}
              <Pressable onPress={() => onDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>×</Text>
              </Pressable>
            </View>
            <Text style={styles.itemCategory}>{item.category.toUpperCase()}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemTags}>
              {item.styleTags.slice(0, 2).map((tag) => <Text key={tag} style={styles.itemTag}>{tag}</Text>)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ReviewScreen({ draft, onBack, onChoosePhoto, onSave, onUpdate }: { draft: WardrobeItem | null; onBack: () => void; onChoosePhoto: () => void; onSave: () => void; onUpdate: (draft: WardrobeItem | null) => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backText}>← Back</Text></Pressable>
        <Text style={styles.pageKicker}>STEP 01 / REVIEW</Text>
        <Text style={styles.pageTitle}>Let’s get this piece right.</Text>
        <Text style={styles.pageBody}>Outfitted makes a suggestion. You stay in control before anything enters your private closet.</Text>
        <View style={styles.uploadPreview}>
          {draft?.imageUri ? <Image source={{ uri: draft.imageUri }} style={styles.previewImage} /> : <Text style={styles.previewIcon}>＋</Text>}
          {!draft && <Text style={styles.previewText}>Choose a photo to begin</Text>}
        </View>
        {!draft ? (
          <Pressable onPress={onChoosePhoto} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Text style={styles.primaryButtonText}>Choose clothing photo</Text>
            <Text style={styles.primaryButtonArrow}>→</Text>
          </Pressable>
        ) : (
          <View style={styles.reviewPanel}>
            <Text style={styles.sectionLabel}>NAME</Text>
            <Pressable style={styles.nameField} onPress={() => onUpdate({ ...draft, name: draft.name === 'New wardrobe item' ? 'My new piece' : 'New wardrobe item' })}>
              <Text style={styles.nameFieldText}>{draft.name}</Text>
              <Text style={styles.editHint}>tap to edit</Text>
            </Pressable>
            <Text style={styles.sectionLabel}>CATEGORY</Text>
            <View style={styles.chipWrap}>{MVP_CATEGORIES.map((category) => <TagChip key={category} label={category} selected={draft.category === category} onPress={() => onUpdate({ ...draft, category: category as Category })} />)}</View>
            <Text style={styles.sectionLabel}>STYLE TAGS</Text>
            <View style={styles.chipWrap}>{STYLE_TAGS.map((tag) => <TagChip key={tag} label={tag} selected={draft.styleTags.includes(tag)} onPress={() => { const styleTags = draft.styleTags.includes(tag) ? draft.styleTags.filter((item) => item !== tag) : [...draft.styleTags, tag]; onUpdate({ ...draft, styleTags: styleTags as StyleTag[] }); }} />)}</View>
            <View style={styles.reviewNotice}><Text style={styles.reviewNoticeTitle}>AI draft, your approval.</Text><Text style={styles.reviewNoticeBody}>These tags stay local and can be changed any time.</Text></View>
            <Pressable onPress={onSave} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Save to my closet</Text><Text style={styles.primaryButtonArrow}>→</Text></Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function PrivacyScreen() {
  return (
    <View>
      <View style={styles.pageIntro}>
        <Text style={styles.pageKicker}>YOUR DATA / LOCAL FIRST</Text>
        <Text style={styles.pageTitle}>Your closet stays close.</Text>
        <Text style={styles.pageBody}>This development build keeps wardrobe photos, tags, recommendations, and location inside your local environment.</Text>
      </View>
      <View style={styles.privacyCard}>
        <PrivacyRow title="Private wardrobe" detail="Only your local account can access it." />
        <PrivacyRow title="AI tag review" detail="Nothing is saved until you approve the draft." />
        <PrivacyRow title="No external AI" detail="Wardrobe images never leave this local build." />
        <PrivacyRow title="Shopping exception" detail="Only searches you initiate can open external links." last />
      </View>
      <Text style={styles.privacyFootnote}>Outfitted is currently a local portfolio build. Cloud Firebase and Google or Apple sign-in are future decisions, not active services.</Text>
    </View>
  );
}

function PrivacyRow({ title, detail, last = false }: { title: string; detail: string; last?: boolean }) {
  return <View style={[styles.privacyRow, last && styles.lastPrivacyRow]}><View style={styles.privacyDot} /><View style={styles.privacyCopy}><Text style={styles.privacyTitle}>{title}</Text><Text style={styles.privacyDetail}>{detail}</Text></View></View>;
}

function SectionHeading({ title, action }: { title: string; action: string }) {
  return <View style={styles.sectionHeading}><Text style={styles.sectionHeadingTitle}>{title}</Text><Text style={styles.sectionHeadingAction}>{action}</Text></View>;
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.tabButton}><View style={[styles.tabDot, active && styles.activeTabDot]} /><Text style={[styles.tabLabel, active && styles.activeTabLabel]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.paper, flex: 1 },
  container: { paddingBottom: 110, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  welcomeContainer: { flexGrow: 1, padding: spacing.lg, paddingTop: spacing.xl },
  welcomeWordmark: { color: colors.charcoal, fontFamily: 'serif', fontSize: 46, letterSpacing: -2, marginBottom: spacing.xl },
  welcomeHero: { backgroundColor: colors.cream, borderRadius: 28, marginBottom: spacing.xl, padding: spacing.lg },
  welcomeTitle: { color: colors.charcoal, fontFamily: 'serif', fontSize: 38, lineHeight: 42, marginBottom: spacing.md },
  textInput: { borderBottomColor: colors.line, borderBottomWidth: 1, color: colors.charcoal, fontFamily: 'serif', fontSize: 21, marginBottom: spacing.lg, paddingBottom: spacing.sm },
  ageRow: { alignItems: 'center', flexDirection: 'row', marginBottom: spacing.md, marginTop: spacing.sm },
  checkbox: { alignItems: 'center', borderColor: colors.olive, borderRadius: 5, borderWidth: 1, height: 22, justifyContent: 'center', marginRight: spacing.sm, width: 22 },
  checkedBox: { backgroundColor: colors.olive },
  checkmark: { color: colors.white, fontSize: 15, fontWeight: '800' },
  ageText: { color: colors.charcoal, fontSize: 13, fontWeight: '600' },
  localNotice: { backgroundColor: colors.softOlive, borderRadius: 14, marginBottom: spacing.lg, padding: spacing.md },
  localNoticeTitle: { color: colors.olive, fontSize: 14, fontWeight: '800', marginBottom: 4 },
  localNoticeBody: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  disabledButton: { backgroundColor: colors.line },
  headerRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  eyebrow: { color: colors.terracotta, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  wordmark: { color: colors.charcoal, fontFamily: 'serif', fontSize: 31, letterSpacing: -1.4 },
  avatar: { alignItems: 'center', backgroundColor: colors.softOlive, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  avatarText: { color: colors.olive, fontSize: 12, fontWeight: '800' },
  hero: { backgroundColor: colors.cream, borderRadius: 28, marginBottom: spacing.xl, padding: spacing.lg },
  heroKicker: { color: colors.olive, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: spacing.lg },
  heroTitle: { color: colors.charcoal, fontFamily: 'serif', fontSize: 42, lineHeight: 45, marginBottom: spacing.md },
  heroBody: { color: colors.muted, fontSize: 15, lineHeight: 23, marginBottom: spacing.lg, maxWidth: 280 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.terracotta, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: 15 },
  primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  primaryButtonArrow: { color: colors.white, fontSize: 22 },
  secondaryButton: { alignItems: 'center', borderColor: colors.terracotta, borderRadius: 14, borderWidth: 1, marginBottom: spacing.lg, paddingVertical: 13 },
  secondaryButtonText: { color: colors.terracotta, fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.72 },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionHeadingTitle: { color: colors.charcoal, fontFamily: 'serif', fontSize: 25 },
  sectionHeadingAction: { color: colors.terracotta, fontSize: 12, fontWeight: '800' },
  recommendationList: { gap: spacing.sm },
  recommendationCard: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 19, borderWidth: 1, flexDirection: 'row', overflow: 'hidden' },
  recommendationImage: { alignItems: 'center', backgroundColor: colors.dustyRose, justifyContent: 'space-between', padding: spacing.sm, width: 102 },
  recommendationImageAlt: { backgroundColor: colors.softOlive },
  recommendationNumber: { alignSelf: 'flex-start', color: colors.charcoal, fontSize: 11, fontWeight: '800' },
  recommendationMark: { color: colors.white, fontSize: 44 },
  recommendationContent: { flex: 1, padding: spacing.md },
  cardEyebrow: { color: colors.terracotta, fontSize: 9, fontWeight: '800', letterSpacing: 1.1, marginBottom: 5 },
  cardTitle: { color: colors.charcoal, fontFamily: 'serif', fontSize: 21, marginBottom: 3 },
  cardDetail: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  feedbackRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  feedbackText: { color: colors.olive, fontSize: 11, fontWeight: '800' },
  feedbackDivider: { color: colors.line },
  closetSummary: { alignItems: 'center', backgroundColor: colors.olive, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, padding: spacing.md },
  summaryTitle: { color: colors.white, fontFamily: 'serif', fontSize: 21 },
  summaryArrow: { color: colors.white, fontSize: 24 },
  pageIntro: { marginBottom: spacing.lg },
  pageKicker: { color: colors.terracotta, fontSize: 10, fontWeight: '800', letterSpacing: 1.3, marginBottom: spacing.sm },
  pageTitle: { color: colors.charcoal, fontFamily: 'serif', fontSize: 38, lineHeight: 42, marginBottom: spacing.sm },
  pageBody: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  itemCard: { width: '47%' },
  itemImageWrap: { alignItems: 'center', backgroundColor: colors.cream, borderRadius: 18, height: 170, justifyContent: 'center', marginBottom: spacing.sm, overflow: 'hidden', position: 'relative' },
  itemImage: { height: '100%', width: '100%' },
  itemPlaceholder: { color: colors.terracotta, fontSize: 48 },
  deleteButton: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 15, height: 30, justifyContent: 'center', position: 'absolute', right: 8, top: 8, width: 30 },
  deleteText: { color: colors.terracotta, fontSize: 21, lineHeight: 22 },
  itemCategory: { color: colors.terracotta, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  itemName: { color: colors.charcoal, fontFamily: 'serif', fontSize: 18, marginTop: 3 },
  itemTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 },
  itemTag: { color: colors.muted, fontSize: 10 },
  backButton: { marginBottom: spacing.xl },
  backText: { color: colors.terracotta, fontSize: 14, fontWeight: '800' },
  uploadPreview: { alignItems: 'center', backgroundColor: colors.cream, borderRadius: 24, height: 250, justifyContent: 'center', marginBottom: spacing.lg, overflow: 'hidden' },
  previewImage: { height: '100%', width: '100%' },
  previewIcon: { color: colors.terracotta, fontSize: 48 },
  previewText: { color: colors.muted, fontSize: 13, marginTop: spacing.sm },
  reviewPanel: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 20, borderWidth: 1, padding: spacing.md },
  sectionLabel: { color: colors.olive, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: spacing.sm, marginTop: spacing.sm },
  nameField: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: spacing.sm },
  nameFieldText: { color: colors.charcoal, fontFamily: 'serif', fontSize: 22 },
  editHint: { color: colors.terracotta, fontSize: 10, fontWeight: '800' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  reviewNotice: { backgroundColor: colors.softOlive, borderRadius: 14, marginBottom: spacing.md, marginTop: spacing.sm, padding: spacing.md },
  reviewNoticeTitle: { color: colors.olive, fontSize: 14, fontWeight: '800', marginBottom: 4 },
  reviewNoticeBody: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  privacyCard: { backgroundColor: colors.cream, borderRadius: 22, paddingHorizontal: spacing.md },
  privacyRow: { alignItems: 'flex-start', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.md },
  lastPrivacyRow: { borderBottomWidth: 0 },
  privacyDot: { backgroundColor: colors.terracotta, borderRadius: 5, height: 10, marginRight: spacing.md, marginTop: 4, width: 10 },
  privacyCopy: { flex: 1 },
  privacyTitle: { color: colors.charcoal, fontSize: 15, fontWeight: '800', marginBottom: 3 },
  privacyDetail: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  privacyFootnote: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: spacing.lg },
  tabBar: { alignItems: 'center', backgroundColor: colors.paper, borderTopColor: colors.line, borderTopWidth: 1, bottom: 0, flexDirection: 'row', justifyContent: 'space-around', left: 0, paddingBottom: 14, paddingTop: 11, position: 'absolute', right: 0 },
  tabButton: { alignItems: 'center', gap: 5, minWidth: 80 },
  tabDot: { backgroundColor: colors.line, borderRadius: 4, height: 7, width: 7 },
  activeTabDot: { backgroundColor: colors.terracotta },
  tabLabel: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  activeTabLabel: { color: colors.charcoal },
});
