---
description: Jira üzerindeki görevleri ve durumlarını kontrol etme
---

1. Öncelikle `c:\Users\doruk\.gemini\antigravity\mcp_config.json` dosyasını okuyarak `ATLASSIAN_EMAIL`, `ATLASSIAN_API_TOKEN` ve `ATLASSIAN_URL` bilgilerini al.

2. Aşağıdaki kurallara uygun bir PowerShell scripti oluştur ve çalıştır:
   - **Önemli:** Jira API v3 için `GET /rest/api/3/search` endpointi "deprecated" (kaldırıldı) durumdadır ve 410 hatası verir.
   - Mutlaka **POST** metodu ile `${ATLASSIAN_URL}/rest/api/3/search/jql` endpointini kullanmalısın.
   - **Headers:** 
     - `Authorization: Basic <Base64(email:token)>`
     - `Content-Type: application/json`
   - **Body (JSON):**
     ```json
     {
       "jql": "status IN (Done, 'In Progress') ORDER BY updated DESC",
       "maxResults": 10,
       "fields": ["summary", "status", "assignee", "priority"]
     }
     ```

3. Script çıktısını kullanıcıya özetle.
