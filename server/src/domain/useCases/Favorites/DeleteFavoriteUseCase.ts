export interface DeleteFavoriteUseCase {
  execute: (favoriteId: string, userId: string) => Promise<number>
}
