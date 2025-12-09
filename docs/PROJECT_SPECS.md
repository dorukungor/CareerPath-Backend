# 🌍 CAREER PATH - MASTER PROJECT SPECIFICATIONS
**Sürüm:** 1.1.0 (MVP 2 Başlangıcı)
**Durum:** MVP 2 Geliştirme Süreci
**Vizyon:** Yazılım sektörüne girmek isteyenler için karmaşayı ortadan kaldıran, nokta atışı uzmanlık yolları (Backend .NET, Java Spring vb.) sunan ve kişisel ilerlemeyi takip eden akıllı kariyer platformu.

---

## 1. 🧠 YÖNETİM VE SÜREÇ (Yarkın'ın Sorumlulukları)
**Rol:** Senior Project Manager & Product Owner (PM/PO)
* **Süreç Takibi:** Jira'nın güncel kalması.
* **İş Geliştirme:** Üyelik ve ilerleme sisteminin kurgulanması.
* **Kalite Güvence:** "Specialized Path" (Uzmanlaşmış Yol) stratejisinin korunması.

---

## 2. 🗺️ PROJE YOL HARİTASI

### 🟢 MVP 1: "THE SKELETON" (Tamamlandı)
* **Durum:** ✅ Bitti.
* **Çıktı:** Docker/Postgres altyapısı, Public Meslek Listesi, Medium tarzı detay sayfası.

---

### 🟡 MVP 2: "THE USER & INTERACTION" (ŞU ANKİ ODAK)
**Amaç:** Kullanıcıyı sisteme dahil etmek, çoklu kariyer takibi (Portföy Kariyer) ve ilerleme kaydı.

#### A. Stratejik Değişiklikler (Anayasa Güncellemesi)
1.  **Uzmanlık Bazlı Yollar (Specialized Paths):**
    * Genel "Backend Developer" başlığı yerine **"Backend Developer (.NET)"**, **"Backend Developer (Java)"** gibi spesifik teknoloji içeren yollar oluşturulacak.
    * Böylece kullanıcı "Ben C# öğreneceğim" diyerek net bir yola girebilecek.
2.  **Portföy Kariyer (Portfolio Career):**
    * Bir kullanıcı aynı anda birden fazla yolu (Örn: Backend .NET + Data Science) takip edebilir.
    * Tek bir yola hapsolmak yok.

#### B. Fonksiyonel Gereksinimler
1.  **Auth (Kimlik):** Register/Login (JWT).
2.  **Keşfet (Explore) Sayfası:**
    * Ziyaretçilerin tüm meslekleri gezdiği vitrin.
    * Burada "Takip Et" (Follow) butonu olacak.
3.  **Kariyerlerim (Dashboard) Sayfası:**
    * Kullanıcının sadece takip ettiği mesleklerin listelendiği özel alan.
    * Her kartta ilerleme çubuğu (Progress Bar: %45) görünecek.
4.  **İlerleme Takibi:**
    * Roadmap detayında her adımın yanında "Tamamladım" (Checkbox) kutucuğu olacak.
    * İşaretlenen her adım, Dashboard'daki yüzdeyi artıracak.

#### C. Teknik Gereksinimler
* **Backend:** JWT Authentication, Many-to-Many ilişki yönetimi.
* **Frontend:** Protected Routes (Giriş yapmayanı Dashboard'a sokma), Context API ile User State yönetimi.

---

### 🔴 MVP 3: "THE GUIDE" (Gelecek)
* Akıllı İçerik Eşleştirme (Tag-Based).
* Kullanıcıya özel kurs önerileri.

---

## 3. 📊 VERİTABANI MODELİ TASLAĞI (Kerem İçin)

**Mevcut Tablolar:**
* `Professions`: (Güncelleme: Title alanları "Backend (.NET)" gibi spesifik olacak).
* `RoadmapSteps`: (Summary, Description eklendi).
* `Resources`: (Type, Url eklendi).

**MVP 2 İle Eklenecek Yeni Tablolar:**
1.  **`AppUser` (Users):**
    * `Id (Guid)`, `Email`, `PasswordHash`, `FullName`, `CreatedAt`.
2.  **`UserProfessions` (Takip Listesi - Many-to-Many):**
    * `UserId` (FK), `ProfessionId` (FK), `StartedAt`, `IsCompleted`.
    * *Mantık:* Bir kullanıcı birden çok mesleği takip edebilir.
3.  **`UserStepProgress` (İlerleme Durumu):**
    * `UserId` (FK), `RoadmapStepId` (FK), `CompletedAt`.
    * *Mantık:* Kullanıcının hangi adımlara "Tik" attığını tutar.

---

## 4. 📈 İŞ GELİŞTİRME NOTLARI
* **User Retention (Tutundurma):** Kullanıcının Dashboard'a geri gelmesi için ilerleme çubuğu (% doluluk oranı) motive edici şekilde tasarlanmalı.