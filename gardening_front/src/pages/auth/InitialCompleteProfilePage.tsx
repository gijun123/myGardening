import CompleteProfileFeature from "@/features/auth/completeProfile/CompleteProfileFeature.tsx";


export default function InitialCompleteProfilePage() {

    const pageTitle:string ="회원 정보 추가 등록";
    const pageDescription:string = "최초 로그인 시 필요한 정보를 입력해주세요.";

    return (


        <CompleteProfileFeature
            pageTitle={pageTitle}
            pageDescription={pageDescription}
        />

    );
}

