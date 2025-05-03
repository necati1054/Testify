# Testify - Online Sınav Yönetim Sistemi

## 🚀 Proje Hakkında

Testify, öğretmenlerin soru ekleyip öğrencilerin bu soruları çözebildiği online bir sınav sistemidir. Açık uçlu sorular, çoktan seçmeli testler ve boşluk doldurma gibi farklı soru tiplerini destekler. Ayrıca OpenAI’nin ChatGPT4o modelini kullanarak açık uçlu soruların değerlendirilmesini sağlayarak öğretmenlerin iş yükünü azaltır.

🌐 **Demo:** [https://testify.necatiarman.dev/](https://testify.necatiarman.dev/)

## 🛠️ Kullanılan Teknolojiler

- **React 18.2.0**
- **Material-UI (MUI) 5.x**
- **Redux Toolkit**
- **React Router 6.x**
- **Axios**
- **React Hook Form**
- **Yup (Form Validasyonu)**
- **ECharts (Veri Görselleştirme)**
- **JWT Authentication**

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/necati1054/Testify.git
```

2. Proje dizinine gidin:
```bash
cd client
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Geliştirme sunucusunu başlatın:
```bash
npm start
```

## 📦 Derleme

Windows için:
```bash
npm run winBuild
```

Linux/Mac için:
```bash
npm run build
```

## 🌟 Mevcut Özellikler

- 🎨 Modern ve Responsive Tasarım
- 🔐 JWT Tabanlı Kimlik Doğrulama
- 📊 Veri Görselleştirme (ECharts)
- 📱 Mobil Uyumlu Arayüz
- 🔄 State Yönetimi (Redux Toolkit)
- 📝 Form Validasyonu
- 🚀 Optimize Edilmiş Performans
- 📸 Soru ve Cevaplar için Resim Yükleme Desteği
- 📊 Test Sonuçları Analizi
- 🖨️ Test Sonuçlarını Yazdırma Özelliği
- 📱 Responsive Tasarım
- 🔗 Sosyal Medya Paylaşım Desteği

## 🗂️ Proje Yapısı

```
src/
├── app/                    # Ana uygulama dosyaları
│   ├── auth/              # Kimlik doğrulama işlemleri
│   ├── components/        # Yeniden kullanılabilir bileşenler
│   ├── contexts/          # React context'leri
│   ├── hooks/             # Özel React hook'ları
│   └── utils/             # Yardımcı fonksiyonlar
├── components/            # Genel bileşenler
├── axios.js              # Axios yapılandırması
└── index.jsx             # Uygulama giriş noktası
```

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.
