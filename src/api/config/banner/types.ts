export interface BannerForm {
  /**
   * 乐观锁
   */
  version: number;

  /**
   * OSS_ID
   */
  ossId: string | number;
}