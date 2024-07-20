import { CheckSquare, Square } from '@phosphor-icons/react';
import { useState } from 'react';

function Checkbox({
    onChange,
    checked,
    size = 24
}: {
    onChange: (value: boolean) => void;
    checked: boolean;
    size: number;
}) {
    const [enabled, setEnabled] = useState(checked);
    function check() {
        setEnabled(!enabled);
        console.log('setEnabledCall: ', enabled);
        if (onChange) onChange(enabled);
    }
    return (
        <div>
            {enabled ? (
                <CheckSquare weight="fill" size={size} onClick={check} />
            ) : (
                <Square weight="regular" size={size} onClick={check} />
            )}
        </div>
    );
}

export default Checkbox;
