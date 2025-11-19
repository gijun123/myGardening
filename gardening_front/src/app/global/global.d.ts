export {};

declare global {
    interface Window {
        daum: {
            Postcode: new (options: {
                oncomplete: (data: {
                    roadAddress: string;
                    jibunAddress: string;
                    zonecode: string;
                    [key: string]: any;
                }) => void;
            }) => {
                open: () => void;
            };
        };
    }
}
