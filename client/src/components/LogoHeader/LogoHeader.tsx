import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import L from './LogoHeader.styles';
import { AppImages } from '../../configs/AppImages';
import { Button, Divider } from 'antd';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/AuthStore';
import { RightOutlined } from '@ant-design/icons';

interface IProps {
  headerIcons?: boolean;
}

function LogoHeader({ headerIcons }: IProps) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const user = useAuthStore((state) => state?.user);
  // console.log(user);

  const buttons = [
    { text: '작성 글', onClick: () => console.log('작성 글 버튼 클릭') },
    { text: '작성 댓글', onClick: () => console.log('작성 댓글 버튼 클릭') },
    {
      text: '프로필 편집',
      onClick: () => console.log('프로필 편집 버튼 클릭'),
    },
  ];

  const loginButtons = [
    { text: '로그인', onClick: () => router.push('/login') },
    { text: '회원가입', onClick: () => router.push('/signup') },
  ];

  return (
    <L.LogoHeaderWrapper>
      <Link href="/">
        <Image
          src={AppImages.InPlaceLogo}
          alt="inplace-logo"
          width="50"
          height="50"
        />
      </Link>
      {headerIcons ? (
        <>
          <L.HeaderIcons>
            <Button type="text" shape="circle" onClick={() => router.push(`/`)}>
              <Image src={AppImages.ArchiveIcon} alt="ArchiveIcon" />
            </Button>
            <Button type="text" shape="circle" onClick={() => router.push(`/`)}>
              <Image src={AppImages.UserIcon} alt="UserIcon" />
            </Button>
            <Button
              type="text"
              shape="circle"
              onClick={() => setOpenDrawer(true)}
            >
              <Image src={AppImages.ListIcon} alt="ListIcon" />
            </Button>
          </L.HeaderIcons>
          <L.MyDrawer
            title={
              <L.DrawerHeader>
                <Image
                  src={AppImages.InPlaceLogo}
                  alt="profileImage"
                  width="30"
                  height="30"
                />
                설정
              </L.DrawerHeader>
            }
            placement="right"
            closable={true}
            width={'auto'}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            <L.DrawerBodyWrapper>
              <L.ProfileWrapper>
                <Image
                  src="https://www.gravatar.com/avatar?d=mp&f=y"
                  width={100}
                  height={100}
                  style={{ borderRadius: '50px' }}
                  alt="avatar"
                />
                {user && (
                  <>
                    <span>안녕하세요</span>
                    <h3>{user.username}님</h3>
                  </>
                )}
              </L.ProfileWrapper>
              <Divider />

              {buttons.map((button) => (
                <L.StyledButton
                  type="text"
                  shape="round"
                  key={button.text}
                  onClick={button.onClick}
                >
                  {button.text}
                  <RightOutlined />
                </L.StyledButton>
              ))}

              <Divider />
              <L.LoginOutWrapper>
                {user ? (
                  <L.StyledButton
                    type="text"
                    shape="round"
                    onClick={() => router.push('/signup')}
                  >
                    로그아웃
                  </L.StyledButton>
                ) : (
                  <>
                    {loginButtons.map((button) => (
                      <L.StyledButton
                        type="text"
                        shape="round"
                        key={button.text}
                        onClick={button.onClick}
                      >
                        {button.text}
                      </L.StyledButton>
                    ))}
                  </>
                )}
              </L.LoginOutWrapper>
              <Divider />
            </L.DrawerBodyWrapper>
          </L.MyDrawer>
        </>
      ) : (
        ''
      )}
    </L.LogoHeaderWrapper>
  );
}

export default LogoHeader;
