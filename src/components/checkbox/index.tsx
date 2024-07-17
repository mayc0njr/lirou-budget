import { CheckSquare, Square } from '@phosphor-icons/react';
import { useState } from 'react';

function Checkbox({
    onchange,
    checked,
    size = 24,
    weight = 'regular'
}: {
    onchange: (value: boolean) => void;
    checked: boolean;
    size: number;
    weight: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}) {
    const [enabled, setEnabled] = useState(checked);
    function check() {
        setEnabled(!enabled);
        console.log('setEnabledCall: ', enabled);
        if (onchange) onchange(enabled);
    }
    return (
        <div>
            {enabled ? (
                <CheckSquare weight="fill" size={size} onClick={check} />
            ) : (
                <Square weight={weight} size={size} onClick={check} />
            )}
        </div>
    );
}

export default Checkbox;
