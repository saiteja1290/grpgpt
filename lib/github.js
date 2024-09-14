const MAX_FILE_SIZE = 100000; // 100 KB
const MAX_TOTAL_SIZE = 1000000; // 1 MB
const RELEVANT_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.md'];

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function fetchFileContent(url) {
    try {
        const response = await fetchWithTimeout(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error(`Error fetching file content: ${url}`, error);
        return null;
    }
}

export async function getRepoContents(owner, repo, branch = 'main') {
    try {
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
        const response = await fetchWithTimeout(apiUrl);

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || `Failed to fetch repo contents. Status: ${response.status}`);
        }

        const data = await response.json();

        let totalSize = 0;
        const contents = [];

        for (const file of data.tree) {
            if (file.type !== 'blob') continue;
            if (file.size > MAX_FILE_SIZE) continue;
            if (!RELEVANT_EXTENSIONS.some(ext => file.path.endsWith(ext))) continue;

            totalSize += file.size;
            if (totalSize > MAX_TOTAL_SIZE) break;

            const content = await fetchFileContent(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`);
            if (content !== null) {
                contents.push({
                    name: file.path.split('/').pop(),
                    path: file.path,
                    content: content,
                });
            }
        }

        return contents;

    } catch (error) {
        console.error('Error in getRepoContents:', error);
        throw error;
    }
}