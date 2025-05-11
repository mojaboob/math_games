from gtts import gTTS
import os
# النصوص الخاصة بدرس الضرب
texts_multiplication = {
    "intro_multiplication": "مرحبًا يا أصدقاء! سنتعلم اليوم عن الضرب، وهو الجمع المتكرر لنفس الرقم.",
    "example1_multiplication": "مثال: ثلاثة في أربعة يساوي اثنا عشر. أي أننا جمعنا الرقم ثلاثة أربع مرات.",
    "example2_multiplication": "مثال آخر: اثنان في خمسة يساوي عشرة. أي أننا جمعنا الرقم اثنين خمس مرات.",
    "tip_multiplication": "نصيحة: استخدم جدول الضرب لتتعلم بشكل أسرع.",
    "q1_multiplication": " هيا نحل هذا السؤال :ما حاصل ضرب اثنان في أربعة؟",
    "q2_multiplication": "فكر جيدا! ما حاصل ضرب ثلاثة في خمسة؟",
    "q3_multiplication": "سؤال أخير يا شطار: كم يساوي حاصل ضرب ستة في اثنين؟"
}

# إنشاء مجلد الصوتيات إذا لم يكن موجودًا
os.makedirs("audio", exist_ok=True)

# توليد ملفات صوت الضرب
for name, text in texts_multiplication.items():
    tts = gTTS(text=text, lang='ar')
    path = f"audio/{name}.mp3"
    tts.save(path)
    print(f"✅ تم حفظ: {path}")

print("\n✅ تم إنشاء جميع ملفات الصوت في مجلد audio.")
