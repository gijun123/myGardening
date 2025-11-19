import React from 'react';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props {
    onVerify?: () => void;
    disabled?: boolean;
}

// forwardRef를 통해 ref를 Button에 전달
const PhoneVerificationButton = React.forwardRef<HTMLButtonElement, Props>(
    ({ onVerify, disabled = false }, ref) => {
        return (
            <Button
                ref={ref}
                type="button"
                onClick={onVerify}
                disabled={disabled}
                className="ml-2 px-3 py-1"
            >
                전화번호 인증
            </Button>
        );
    }
);

PhoneVerificationButton.displayName = 'PhoneVerificationButton';

export default PhoneVerificationButton;