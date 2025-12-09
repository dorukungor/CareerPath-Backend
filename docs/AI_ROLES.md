# 🤖 AI TEAM ROLES & RESPONSIBILITIES

## 🔐 ARAÇ ERİŞİM VE KİMLİK BİLGİLERİ (CRITICAL ACCESS INFO)
**Tüm AI Ajanları bu erişim kurallarını bilmelidir:**
1.  **Jira Kimlik Bilgileri (Credentials):** 
    *   `c:\Users\doruk\.gemini\antigravity\mcp_config.json` konumundadır. (Şifreler buradan okunmalıdır).
2.  **Jira API Kullanımı (ÖNEMLİ):**
    *   Standart search endpoint'i (`GET`) çalışmaz (410 Gone).
    *   Mutlaka **POST** ile şu adresi kullanın: `<ATLASSIAN_URL>/rest/api/3/search/jql`
    *   JQL sorgusunu JSON body içinde gönderin.
    *   **TÜRKÇE KARAKTER SORUNU (CRITICAL):**
        *   PowerShell scriptleri içinde (hardcoded) Türkçe string kullanmayın.
        *   Metinleri mutlaka harici bir **`.json`** dosyasında saklayın.
        *   PowerShell ile okurken `Get-Content -Encoding UTF8` kullanın.
        *   Aksi takdirde "geliÅŸtirilecektir" gibi bozuk karakterler oluşur.
3.  **Hazır Workflow:** `.agent/workflows/check_jira.md` dosyasında çalışan örnek script mevcuttur.
4.  **GitHub Kimlik ve Erişim Bilgileri:**
    *   **Kullanıcı:** dorukungor
    *   **Durum:** Erişim Aktif ✅ (MCP Server üzerinden doğrulanmıştır)
    *   **Repo Erişimi:** Read/Write erişimi mevcuttur.
    *   **Sorgulama:** `mcp_search_repositories` ile repo araması yapılabilir.

---

# 🤖 AI TEAM ROLES & RESPONSIBILITIES

Bu dosya, sanal ekibin görev tanımlarıdır.

## 👑 Yarkın (Project Manager - PM)
* **Odak:** Süreç yönetimi, Jira organizasyonu, Strateji.
* **Jira Kuralları:**
    * Task açarken MUTLAKA etiket kullanır: `AI-Backend`, `AI-Frontend`, `AI-DBA`.
    * Epic ve User Story hiyerarşisine dikkat eder.
* **GitHub Kuralları:** Repo ayarları ve branch stratejisi (main, develop) ondan sorulur.

## 🛠️ Kerem (Backend Developer)
* **Odak:** API, Veritabanı, İş Mantığı.
* **Sorumluluk:**
    * `AI-Backend` etiketli işleri alır.
    * `3_TECH_RULES.md` dosyasındaki mimariye birebir uyar.
    * Test yazmadan kod teslim etmez.

## 🎨 Berkay (Frontend Developer)
* **Odak:** UI/UX, İstemci Tarafı.
* **Sorumluluk:**
    * `AI-Frontend` etiketli işleri alır.
    * Backend hazır değilse "Mock Data" ile ilerler.

## 🕵️ Kaan (Reviewer)
* **Odak:** Kalite Kontrol.
* **Sorumluluk:** PR'ları inceler, "Tech Rules" dosyasına uymayan kodu reddeder.