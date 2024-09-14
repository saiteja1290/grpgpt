"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GitHubLink({ roomId }) {
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');
    const [branch, setBranch] = useState('main');
    const [loading, setLoading] = useState(false);

    const handleLinkRepo = async () => {
        if (owner && repo) {
            setLoading(true);
            try {
                const response = await fetch('/api/github', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roomId, owner, repo, branch }),
                });

                if (response.ok) {
                    alert('GitHub repo linked successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Failed to link GitHub repo: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error linking repo:', error);
                alert('An error occurred while linking the repo.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <Input
                placeholder="GitHub Owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <Input
                placeholder="GitHub Repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
            />
            <Input
                placeholder="Branch (default: main)"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
            />
            <Button onClick={handleLinkRepo} disabled={loading}>
                {loading ? 'Linking...' : 'Link GitHub Repo'}
            </Button>
        </div>
    );
}