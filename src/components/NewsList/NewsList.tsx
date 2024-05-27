import styles from './NewsList.module.scss';
import NewsPost from './NewsPost/NewsPost';
import NewsService from '@/services/newsService';
import SessionService from '@/services/sessionService';
import ContentPane from '../ContentPane/ContentPane';
import Divider from '../Divider/Divider';
import { PostStatus } from '@prisma/client';
import i18nService from '@/services/i18nService';
import ActionLink from '../ActionButton/ActionLink';
import React from 'react';

interface NewsPostInterface {
  id: number;
  titleSv: string;
  titleEn: string;
  contentSv: string;
  contentEn: string;
  writtenByGammaUserId: string;
  createdAt: Date;
  updatedAt: Date;
  status: PostStatus;
  writtenFor: {
    gammaSuperGroupId: string;
    prettyName: string;
  } | null;
}

const NewsList = async ({ locale }: { locale: string }) => {
  try {
    const news = await NewsService.getPage(1, 10);
    const canPost = await SessionService.isActive().catch(() => false);

    return <News news={news} canPost={canPost} locale={locale} />;
  } catch {
    return <NewsError locale={locale} />;
  }
};

const News = ({
  news,
  canPost,
  locale
}: {
  news: NewsPostInterface[];
  canPost: boolean;
  locale: string;
}) => {
  const l = i18nService.getLocale(locale);
  return (
    <ContentPane>
      <div className={styles.title}>
        <h1>{l.news.title}</h1>
        {canPost && <ActionLink href="/post/new">{l.news.create}</ActionLink>}
      </div>
      {news.length === 0 && (
        <>
          <Divider />
          <p>{l.news.empty}</p>
        </>
      )}
      {news.map((newsPost) => (
        <React.Fragment key={newsPost.id}>
          <Divider />
          <NewsPost locale={locale} post={newsPost} />
        </React.Fragment>
      ))}
    </ContentPane>
  );
};

const NewsError = ({ locale }: { locale?: string }) => {
  const l = i18nService.getLocale(locale);
  return (
    <div className={styles.list}>
      <h1>{l.news.title}</h1>
      <Divider />
      <p>{l.news.error}</p>
    </div>
  );
};

export default NewsList;
