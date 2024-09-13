import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, code }) => {
    return (
        <div className="my-4 rounded-lg overflow-hidden">
            <SyntaxHighlighter
                language={language}
                style={tomorrow}
                customStyle={{
                    padding: '1em',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    borderRadius: '6px',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;