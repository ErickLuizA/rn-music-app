export interface DeleteFavoriteUseCase {
  execute: (favoriteId: number, userId: number) => Promise<void>
}
