import React, { useState } from 'react';
import {
  CommentOutlined,
  DislikeTwoTone,
  FrownTwoTone,
  LikeTwoTone,
  MoreOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, RadioChangeEvent } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import P from './Posts.styles';
import {
  commentBodyEllipsis,
  formattedDate,
  postDescEllipsis,
  postTitleEllipsis,
} from '../../utils';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { authMeAPI } from '../../apis/user';

const voteOptions = [
  { label: <LikeTwoTone twoToneColor="#2515d5" />, value: 'VoteUp' },
  { label: <FrownTwoTone twoToneColor="#eb2f96" />, value: 'VoteNeutral' },
  { label: <DislikeTwoTone twoToneColor="#52c41a" />, value: 'VoteDown' },
];

function AllPosts({ posts }: any) {
  console.log('posts>>>', posts);

  const [open, setOpen] = useState(false);
  const [vote, setVote] = useState('');
  const router = useRouter();

  const [cookie] = useCookies(['inplace']);

  const { data: userInfo } = authMeAPI({ enabled: Boolean(cookie?.inplace) });

  const handleVoteChange = (e: RadioChangeEvent, identifier: string) => {
    if (!userInfo) {
      message.error('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      router.push('/login');
      return;
    }

    const { value } = e.target;
    console.log(`radio checked:${value}`);
    setVote(value);

    switch (value) {
      case 'upVote':
        console.log('업업업', identifier);
        break;

      case 'neutralVote':
        console.log('---', identifier);
        break;

      case 'downVote':
        console.log('다다다운', identifier);
        break;

      default:
        break;
    }
  };

  const handleUpVote = (e: any, identifier: string) => {
    console.log('identifier>>>', identifier);
  };

  return (
    <>
      {posts?.map((post: any) => {
        const {
          identifier,
          username,
          createdAt,
          updatedAt,
          title,
          upVote,
          neutralVote,
          downVote,
          desc,
          images,
          commentCount,
          voteScore,
          comments,
          userVote,
        } = post;

        return (
          <P.Wrapper key={identifier}>
            <P.HeaderWrapper>
              <P.HeaderLeft>
                <Image
                  src="https://www.gravatar.com/avatar?d=mp&f=y"
                  width={46}
                  height={46}
                  style={{ borderRadius: '50px' }}
                  alt="avatar"
                />
                <P.PostInfo>
                  <h4>{username}</h4>
                  <span>{formattedDate(createdAt)}</span> ·{' '}
                  <span>조회 234</span>
                </P.PostInfo>
              </P.HeaderLeft>
              <P.HeaderRight>
                <Button
                  type="text"
                  shape="circle"
                  onClick={() => setOpen(true)}
                >
                  <MoreOutlined style={{ fontSize: '20px' }} />
                </Button>
              </P.HeaderRight>
            </P.HeaderWrapper>
            <P.BodyWrapper>
              {/* 제목, 내용 */}
              <Link href={`/post/${identifier}`}>
                <h3>{postTitleEllipsis(title)}</h3>
                <p>{postDescEllipsis(desc)}</p>
              </Link>
              {/* O X */}
              <P.VoteResultWrapper>
                <P.VoteResult>
                  <LikeTwoTone twoToneColor="#2515d5" />
                  <span>{upVote}</span>
                </P.VoteResult>
                <P.VoteResult>
                  <FrownTwoTone twoToneColor="#eb2f96" />
                  <span>{neutralVote}</span>
                </P.VoteResult>
                <P.VoteResult>
                  <DislikeTwoTone twoToneColor="#52c41a" />
                  <span>{downVote}</span>
                </P.VoteResult>
              </P.VoteResultWrapper>
              {/* 댓글, 투표 통계 버튼 */}
              <P.StaticsWrapper>
                <P.StaticsLeft>
                  <P.StaticsButton type="primary">
                    <PieChartOutlined />
                    {voteScore}
                  </P.StaticsButton>
                  <P.StaticsButton type="primary">
                    <CommentOutlined />
                    {commentCount}
                  </P.StaticsButton>
                </P.StaticsLeft>
                {/* O X 투표 */}
                <P.StaticsRight>
                  <P.VoteSelect
                    size="middle"
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e) => handleVoteChange(e, identifier)}
                  >
                    <P.VoteButtonSmall
                      value="upVote"
                      // onClick={(e) => handleUpVote(e, identifier)}
                    >
                      <LikeTwoTone twoToneColor="#2515d5" />
                    </P.VoteButtonSmall>
                    <P.VoteButtonSmall value="neutralVote">
                      <FrownTwoTone twoToneColor="#eb2f96" />
                    </P.VoteButtonSmall>
                    <P.VoteButtonSmall value="downVote">
                      <DislikeTwoTone twoToneColor="#52c41a" />
                    </P.VoteButtonSmall>
                  </P.VoteSelect>
                </P.StaticsRight>
              </P.StaticsWrapper>

              {/* comment 작업 */}
              <P.CommentWrapper>
                {comments?.map((c: any) => {
                  const { identifier: commentId, body } = c;
                  return (
                    <Link href={`/post/${identifier}`} key={commentId}>
                      <P.Comment>
                        <Image
                          src="https://www.gravatar.com/avatar?d=mp&f=y"
                          width={20}
                          height={20}
                          style={{ borderRadius: '50px' }}
                          alt="avatar"
                        />
                        <span>{commentBodyEllipsis(body)}</span>
                      </P.Comment>
                    </Link>
                  );
                })}
              </P.CommentWrapper>
            </P.BodyWrapper>
            <Divider />
          </P.Wrapper>
        );
      })}
      <P.PostDrawer
        placement="bottom"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        key="bottom"
        height={'auto'}
      >
        <Button type="text" shape="round">
          공유
        </Button>
        <Divider />
        <Button type="text" shape="round">
          스크랩
        </Button>
        <Divider />
        <Button type="text" shape="round">
          팔로우
        </Button>
        <Divider />
        <Button type="text" shape="round">
          수정
        </Button>
        <Divider />
        <Button type="text" shape="round">
          삭제
        </Button>
      </P.PostDrawer>
    </>
  );
}

export default AllPosts;
