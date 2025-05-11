from gtts import gTTS
import os

# النصوص الخاصة بدرس الطرح
texts_subtraction = {
    "intro_subtraction": "مرحبًا أصدقائي! اليوم سنتعلم عن الطرح، وهو عندما نأخذ عددًا من عدد آخر لنحصل على ناتج أقل.",
    "example1_subtraction": "مثال: تسعة ناقص اثنين يساوي سبعة. إذا أخذنا اثنين من تسعة يتبقى سبعة.",
    "example2_subtraction": "مثال آخر: عشرة ناقص أربعة يساوي ستة. نعد أربع خطوات للخلف من عشرة.",
    "tip_subtraction": "نصيحة: يمكنك استخدام المكعبات أو أصابعك لتساعدك في الطرح.",
    "q1_subtraction": " هيا نحل هذا السؤال :ما ناتج سبعة ناقص خمسة؟" ,
    "q2_subtraction": "فكر جيدا ! ما ناتج ستة ناقص ثلاثة؟",
    "q3_subtraction": "آخر سؤال يا شطار: كم يكون ناتج أحد عشر ناقص خمسة؟"
}


# إنشاء مجلد الصوتيات إذا لم يكن موجودًا
os.makedirs("audio", exist_ok=True)

# توليد ملفات صوت الطرح
for name, text in texts_subtraction.items():
    tts = gTTS(text=text, lang='ar')
    path = f"audio/{name}.mp3"
    tts.save(path)
    print(f"✅ تم حفظ: {path}")

print("\n✅ تم إنشاء جميع ملفات الصوت في مجلد audio.")
