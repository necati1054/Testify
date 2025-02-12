# Testify API (Backend)

## Proje Hakkında
Testify API, Testify projesinin backend servisini oluşturan RESTful API sistemidir. Laravel framework'ü kullanılarak geliştirilmiş bu API, modern ve ölçeklenebilir bir mimari sunmaktadır.

## Teknik Altyapı
- Laravel 10
- MySQL Veritabanı
- RESTful API Mimarisi
- JWT Tabanlı Kimlik Doğrulama
- API Rate Limiting
- CORS Yapılandırması

## Kurulum

### Gereksinimler
- PHP >= 8.1
- Composer
- MySQL
- Postman (API testi için)

### Kurulum Adımları
1. Projeyi klonlayın:
```bash
git clone https://github.com/your-username/testify-api.git
cd testify-api
```

2. Composer bağımlılıklarını yükleyin:
```bash
composer install
```

3. `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

4. Uygulama anahtarını oluşturun:
```bash
php artisan key:generate
```

5. JWT secret key oluşturun:
```bash
php artisan jwt:secret
```

6. Veritabanı ayarlarını yapılandırın:
- `.env` dosyasında veritabanı bilgilerinizi düzenleyin
- Migrasyonları çalıştırın:
```bash
php artisan migrate
```

7. API'yi başlatın:
```bash
php artisan serve
```

## API Endpoint'leri

### Kimlik Doğrulama
- POST `/api/auth/login` - Kullanıcı girişi
- POST `/api/auth/register` - Yeni kullanıcı kaydı
- POST `/api/auth/logout` - Çıkış yapma
- GET `/api/auth/me` - Mevcut kullanıcı bilgileri

### Test İşlemleri
- GET `/api/tests` - Test listesi
- POST `/api/tests` - Yeni test oluşturma
- GET `/api/tests/{id}` - Test detayları
- PUT `/api/tests/{id}` - Test güncelleme
- DELETE `/api/tests/{id}` - Test silme

### Sonuç İşlemleri
- GET `/api/results` - Sonuç listesi
- POST `/api/results` - Yeni sonuç kaydetme
- GET `/api/results/{id}` - Sonuç detayları

## Güvenlik
- API istekleri JWT token ile korunmaktadır
- Rate limiting uygulanmıştır
- CORS politikaları yapılandırılmıştır
- Hassas veriler şifrelenmektedir

## API Dokümantasyonu
API dokümantasyonuna aşağıdaki URL'den erişebilirsiniz:
```
http://localhost:8000/api/documentation
```

## Hata Kodları
- 200: Başarılı
- 201: Oluşturuldu
- 400: Geçersiz İstek
- 401: Yetkisiz Erişim
- 403: Erişim Reddedildi
- 404: Bulunamadı
- 422: İşlenemeyen Varlık
- 500: Sunucu Hatası

## Geliştirme Ortamı İçin Notlar
- API'yi test etmek için Postman koleksiyonu `postman` klasöründe bulunmaktadır
- Geliştirme sırasında `php artisan route:list` komutu ile tüm endpoint'leri görüntüleyebilirsiniz
- `.env.example` dosyası örnek yapılandırmaları içermektedir

## Lisans
Bu proje MIT lisansı altında lisanslanmıştır.
