import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { loginAPI } from '../../apis/user';
import { axiosInstance } from '../../configs/axios';
import useAuthStore from '../../store/authStore';
import CommonButton from '../Common/CommonButton';
import InputGroup from '../InputGroup/InputGroup';
import S from './Signup.styles';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const { login, logout, stopLoading, loadUser } = useAuthStore();
  const onError = (error: AxiosError) => {
    setErrors(error.response?.data || {});
  };
  const onSuccess = (res: any) => {
    login(res.user);
    // router.push('/');
  };
  const { mutate } = loginAPI({ onSuccess, onError });

  const isDisabled = useMemo(
    () => Boolean(!email || !password),
    [email, password]
  );

  const onClickLogin = () => {
    console.log(email, password);

    mutate({ email, password });
  };

  return (
    <S.SignupWrapper>
      <h2>
        로그인을 하고
        <br />
      </h2>
      <h2>더 많은 인플레이스를 만나보세요.</h2>
      {/* 이메일 */}
      <h3>이메일 주소</h3>
      <InputGroup
        type="email"
        placeholder="가입하신 이메일 주소를 입력해주세요"
        value={email}
        isfill={email}
        setValue={setEmail}
        error={errors.email}
      />
      {/* 비밀번호 */}
      <h3>비밀번호</h3>
      <InputGroup
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        isfill={password}
        setValue={setPassword}
        error={errors.password}
      />
      <h4>아직 회원이 아니신가요?</h4>
      <Link href="/signup">
        <h5>회원가입 하러 가기</h5>
      </Link>
      <CommonButton type="primary" onClick={onClickLogin} disabled={isDisabled}>
        로그인
      </CommonButton>
    </S.SignupWrapper>
  );
}

export default Login;
