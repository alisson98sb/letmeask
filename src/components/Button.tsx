import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes <HTMLButtonElement> & { // & vai adicionar mais uma propriedade
    isOutlined?: boolean    // O sinal "?" após o nome da propriedade indica que ela não é obrigatória 
};

export function Button({ isOutlined = false, ...props }: ButtonProps) { // "..." Rest Operator, tudo que não for a primeira proprioedade (isOutlined), arquive em "props"
    return (
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}