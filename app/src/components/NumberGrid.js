import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { motion } from 'framer-motion';
const cellVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03 },
    pressed: { scale: 0.96 }
};
const statusClassName = (status) => {
    if (status === 'solved')
        return 'grid-cell grid-cell-solved';
    if (status === 'active')
        return 'grid-cell grid-cell-active';
    return 'grid-cell grid-cell-idle';
};
export const NumberGrid = memo(({ cells, isLocked, onSelect }) => (_jsx("div", { className: "map-grid", children: cells.map((cell) => (_jsx(motion.button, { type: "button", className: statusClassName(cell.status), whileHover: !isLocked && cell.status === 'idle' ? cellVariants.hover : undefined, whileTap: !isLocked && cell.status === 'idle' ? cellVariants.pressed : undefined, onClick: () => onSelect(cell.id), disabled: isLocked || cell.status === 'solved', children: cell.id }, cell.id))) })));
NumberGrid.displayName = 'NumberGrid';
