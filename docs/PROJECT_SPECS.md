# 🌍 CAREER PATH - MASTER PROJECT SPECIFICATIONS
**Sürüm:** 1.0.0
**Durum:** Aktif Geliştirme
**Vizyon:** Yazılım sektörüne girmek isteyenler için karmaşayı ortadan kaldıran, adım adım rehberlik eden ve en doğru kaynakları sunan akıllı kariyer platformu.

---

## 1. 🧠 YÖNETİM VE SÜREÇ (Yarkın'ın Sorumlulukları)

**Rol:** Senior Project Manager & Product Owner (PM/PO)
**Sorumlu Kişi:** Yarkın (AI Agent)

Yarkın, bu projede sadece kod süreçlerini değil, ürünün gelişimini de yönetir. Görevleri:
1.  **Süreç Takibi:** Jira board'unun her zaman güncel kalmasını sağlamak. Sprint planlamasını yapmak.
2.  **İş Geliştirme (BizDev):** Uygulamanın nasıl para kazanabileceğini (Affiliate, Premium, Sponsorluk) düşünerek teknik altyapıyı buna göre kurgulatmak.
3.  **Kalite Güvence:** Kerem ve Berkay'ın çıktılarının vizyona uygunluğunu denetlemek.

---

## 2. 🗺️ PROJE YOL HARİTASI (DETAYLI MVP PLANLAMASI)

Proje, "Agile" prensibiyle 3 ana MVP (Minimum Viable Product) fazına bölünmüştür.

### 🟢 MVP 1: "THE SKELETON" (İskelet ve Veri Sunumu)
**Amaç:** Sistemin ayağa kalkması, veritabanı mimarisinin oturması ve public (halka açık) verinin sunulması. Üyelik sistemi YOK.

#### A. Fonksiyonel Gereksinimler
1.  **Meslek Vitrini:**
    * Kullanıcı ana sayfada meslek kartlarını (Backend, Frontend, DevOps, Mobile vb.) görmeli.
    * Her kartta; Başlık, Kısa Açıklama, Zorluk Derecesi, Ortalama Maaş Aralığı (Tahmini) ve İkon olmalı.
2.  **Roadmap (Yol Haritası) Detayı:**
    * Bir mesleğe tıklandığında dikey bir zaman çizelgesi (Timeline) açılmalı.
    * **Adımlar:** Örn: "Algoritma" -> "C#" -> ".NET Core" -> "SQL".
    * Her adımın bir sırası (OrderIndex) ve tahmini öğrenme süresi olmalı.
3.  **Kaynak Kütüphanesi:**
    * Roadmap üzerindeki bir adıma tıklandığında, o konuyu öğreten kaynaklar listelenmeli.
    * Kaynak Tipleri: Video (YouTube), Kurs (Udemy), Makale (Medium), Dokümantasyon.
    * *BizDev Notu:* Buradaki linkler ileride "Affiliate Link" olacak şekilde veritabanında URL yapısı esnek tutulmalı.

#### B. Teknik Gereksinimler (Kerem & Berkay İçin)
* **DB:** `Professions`, `RoadmapSteps`, `Resources` tabloları arasında Foreign Key ilişkileri (One-to-Many) kusursuz olmalı.
* **API:** Swagger üzerinden veri girişi yapılabilmeli (Admin paneli olmadığı için).
* **UI:** Mobil uyumlu (Responsive) tasarım şart.

---

### 🟡 MVP 2: "THE USER" (Kullanıcı ve Etkileşim)
**Amaç:** Kullanıcıyı sisteme dahil etmek ve ilerlemesini takip etmesini sağlamak.

#### A. Fonksiyonel Gereksinimler
1.  **Kimlik Doğrulama (Auth):**
    * Register/Login işlemleri. (JWT - JSON Web Token yapısı).
    * Şifrelerin Hashlenerek saklanması.
2.  **Kişisel Pano (Dashboard):**
    * Kullanıcı ilgilendiği mesleği "Takip Et" diyebilmeli.
3.  **İlerleme Takibi (Progress Tracking):**
    * Roadmap üzerindeki adımların yanına "Checkbox" konulmalı.
    * Kullanıcı "C# öğrendim" diye işaretlediğinde veritabanında bu durum saklanmalı.
    * İlerleme çubuğu (%40 Tamamlandı) gösterilmeli.

#### B. Teknik Gereksinimler
* **DB:** `Users`, `UserProfessions` (Many-to-Many), `UserStepProgress` tabloları eklenecek.
* **Security:** CORS ayarları ve Rate Limiting eklenecek.

---

### 🔴 MVP 3: "THE GUIDE" (Büyüme ve İçerik)
**Amaç:** Kullanıcıyı içeride tutmak ve gelir modeli oluşturmak.

#### A. Fonksiyonel Gereksinimler
1.  **Akıllı Arama ve Filtreleme:** "Benim matematiğim yok, hangi meslek uygun?" gibi filtreler.
2.  **Yorum ve Puanlama:** Kullanıcılar kaynaklara (Kurslara) puan verebilmeli. "Bu video çok eski, izlemeyin" diyebilmeli.
3.  **Blog / Sektör Haberleri:** SEO uyumlu içerik alanı.

---

## 3. 📊 VERİTABANI MODELİ TASLAĞI (Kerem İçin Referans)

**Yarkın'ın Notu:** Kerem, veritabanını tasarlarken bu ilişki yapısına sadık kalmalı.

* **Profession:** `Id (GUID)`, `Title`, `Slug` (SEO için), `AvgSalary`, `DifficultyLevel`
* **RoadmapStep:** `Id`, `ProfessionId`, `Title`, `Description`, `OrderIndex`, `MustKnow` (Zorunlu mu?)
* **Resource:** `Id`, `StepId`, `Url`, `IsAffiliate` (Bool), `ClickCount` (Analiz için)

---

## 4. 📈 İŞ GELİŞTİRME NOTLARI (Yarkın'ın Takibi İçin)

* **KPI (Başarı Kriteri):** MVP 1 sonunda sistemde en az 5 farklı meslek ve toplam 50+ kaynak tanımlı olmalı.
* **Gelir Stratejisi:** Kaynak linkleri verilirken "Udemy" veya "Coursera" gibi platformların referans parametrelerini (ref_id) saklayabilecek bir yapı kurulmalı.