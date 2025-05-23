from gtts import gTTS
import os

# النصوص التي سيتم تحويلها إلى صوت
texts = {
    "intro_addition": "مرحبًا يا أصدقاء! اليوم سنتعلم عن الجمع، وهو عندما نضيف عددين لنحصل على عدد أكبر. هيا نبدأ!",
    "example1_addition": "مثال: أربعة زائد اثنان يساوي ستة. نعد بعد الأربعة عددين: خمسة، ستة.",
    "example2_addition": "مثال آخر: ثمانية زائد ثلاثة يساوي أحد عشر. نبدأ من ثمانية ونعد ثلاث خطوات: تسعة، عشرة، أحد عشر.",
    "tip_addition": "نصيحة: يمكنك استخدام أصابعك أو الخرز أو المكعبات لمساعدتك على العد.",
    "q1_addition": "هيا نحل هذا السؤال: ما ناتج سبعة زائد خمسة؟",
    "q2_addition": "فكر جيدًا! ما ناتج ستة زائد أربعة؟",
    "q3_addition": "آخر سؤال معنا اليوم: كم يكون تسعة زائد ثلاثة؟",
}

# حفظ الملفات في مجلد audio/
os.makedirs("audio", exist_ok=True)

# توليد الصوتيات
for name, text in texts.items():
    tts = gTTS(text=text, lang='ar')
    path = f"audio/{name}.mp3"
    tts.save(path)
    print(f"تم حفظ الملف: {path}")

print("✅ تم توليد جميع الصوتيات بنجاح!")
