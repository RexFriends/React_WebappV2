import React from 'react';
import type { PopoverOrigin, PopoverPosition } from '@material-ui/core';

type PositionPopupFunction = (
    anchorElement: HTMLElement | null,
    open: boolean,
    setOrigin: React.Dispatch<React.SetStateAction<PopoverOrigin>>,
    setPosition: React.Dispatch<React.SetStateAction<PopoverPosition>>
) => void;

const positionPopup: PositionPopupFunction = (anchorElement, open, setOrigin, setPosition) => {
    if (!open) return;
    // @ts-ignore
    if (!anchorElement) return requestAnimationFrame(positionPopup);

    const clientRect = anchorElement.getBoundingClientRect();
    const bottomHasSpace = clientRect.bottom + 200 < window.innerHeight;
    const rightHasSpace = clientRect.right + 200 < window.innerWidth;
    const vertical = bottomHasSpace ? 'top' : 'bottom';
    const horizontal = rightHasSpace ? 'left': 'right';
    setOrigin({ vertical, horizontal });
    const top = bottomHasSpace ? clientRect.bottom : clientRect.top;
    const left = clientRect.left + clientRect.width / 2;
    setPosition({ top, left });
};

const copyFallback = (link: string) => {
    const inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value = link;
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
};

export { copyFallback, positionPopup };
