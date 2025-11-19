import CompleteProfileFeature from "@/features/auth/completeProfile/CompleteProfileFeature.tsx";


export default function EditCompleteProfilePage() {

    const pageTitle:string ="회원 정보 수정";
    const pageDescription:string = "필요한 정보를 입력해주세요.";

    return (

        <CompleteProfileFeature
            pageTitle={pageTitle}
            pageDescription={pageDescription}
        />

    );
}

