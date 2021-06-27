import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';


type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children? : ReactNode         //ReactNode é qualquer conteudo jsx
    isAnswered?: Boolean;
    isHighlighted?: Boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
}) {
    return (
        <div className={cx(
            'question',
            { answered: isAnswered },
            { hightlighted: isHighlighted && !isAnswered },
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    ); 
}