import {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {completeProfile, getUserInfo} from '@/entities/auth/api';
import type { FieldErrors} from '@/features/auth/completeProfile/types.ts';
import { AxiosError } from 'axios';

export default function useCompleteProfileModel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get('uid') || '';

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [bio, setBio] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});


    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserInfo();
                // DB에서 가져온 정보를 상태에 세팅
                setName(data.name || '');
                setNickname(data.nickname || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');
                setAddressDetail(data.addressDetail || '');
                setZipcode(data.zipcode || '');
                setBio(data.bio || '');
                setProfileUrl(data.profileUrl || '');
                setBirthDate(data.birthDate || '');
            } catch (err) {
                console.error('회원 정보 불러오기 실패', err);
            }
        }

        fetchUser();
    }, [setName, setNickname, setEmail, setPhone, setAddress, setAddressDetail, setZipcode, setBio, setProfileUrl, setBirthDate]);

    const validateField = (field: string, value: string) => {
        switch (field) {
            case 'name':
                if (!value.trim()) return '이름을 입력해주세요.';
                return '';
            case 'nickname':
                if (!value.trim()) return '닉네임을 입력해주세요.';
                if (value.length < 6 || value.length > 20) return '닉네임은 6~20자여야 합니다.';
                return '';
            case 'email':
                if (value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
                    return '유효한 이메일 형식이 아닙니다.';
                return '';
            case 'phone':
                if (value && !/^\d{10,11}$/.test(value.replace(/-/g, '')))
                    return '유효한 전화번호를 입력해주세요.';
                return '';
            case 'zipcode':
                if (value && !/^\d{5}$/.test(value)) return '우편번호는 5자리 숫자여야 합니다.';
                return '';
            case 'birthDate':
                if (value && isNaN(Date.parse(value))) return '유효한 생년월일을 입력해주세요.';
                return '';
            default:
                return '';
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        // 전체 필드 검사
        const newErrors: typeof errors = {
            name: validateField('name', name),
            nickname: validateField('nickname', nickname),
            email: validateField('email', email),
            phone: validateField('phone', phone),
            zipcode: validateField('zipcode', zipcode),
            birthDate: validateField('birthDate', birthDate),
        };

        setErrors(newErrors);

        // 하나라도 에러 있으면 제출 중단
        if (Object.values(newErrors).some(Boolean)) return;

        setLoading(true);

        try {
            await completeProfile({
                name,
                nickname,
                email,
                phone,
                address,
                addressDetail,
                zipcode,
                bio,
                profileUrl,
                birthDate,
            });
            navigate('/auth/dashboard');
        } catch (err: unknown) {
            const axiosError = err as AxiosError;

            console.error(axiosError);
            alert('프로필 저장 중 오류가 발생했습니다.');
        }
        finally {
            setLoading(false);
        }
    };


  return {
    uuid,
    name,
    setName,
    nickname,
    setNickname,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    zipcode,
    setZipcode,
    bio,
    setBio,
    profileUrl,
    setProfileUrl,
    birthDate,
    setBirthDate,
    loading,
      errors,
      setErrors,
    handleSubmit,
  } as const;
}
