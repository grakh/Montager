// ============================================================
// Persistent storage for CEP extension — replaces localStorage
// File location: %APPDATA%/ru.list.don.montager/settings.json
// Caller: main.js / funcs.jsx via csInterface.evalScript
// ============================================================

function _storageFile() {
    var folder = new Folder(Folder.userData + '/ru.list.don.montager');
    if (!folder.exists) {
        try { folder.create(); } catch(e) {}
    }
    return new File(folder.fsName + '/settings.json');
}

// Returns all settings as JSON string. Returns '{}' if file missing/corrupt.
function storageLoadAll() {
    try {
        var f = _storageFile();
        if (!f.exists) return '{}';
        f.encoding = 'UTF-8';
        if (!f.open('r')) return '{}';
        var content = f.read();
        f.close();
        // sanity check — must be valid-ish JSON
        if (!content || content.charAt(0) !== '{') return '{}';
        return content;
    } catch(e) {
        return '{}';
    }
}

// Saves a whole JSON string (comes from JS side). Atomic-ish write.
function storageSaveAll(jsonStr) {
    try {
        if (!jsonStr || typeof jsonStr !== 'string') return false;
        var f = _storageFile();
        f.encoding = 'UTF-8';
        if (!f.open('w')) return false;
        f.write(jsonStr);
        f.close();
        return true;
    } catch(e) {
        return false;
    }
}
