export interface DeleteFavoritesParams {
  id: number
}

export interface IDeleteFavoritesUseCase {
  execute: (params: DeleteFavoritesParams) => Promise<void>
}
