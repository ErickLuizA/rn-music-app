export interface DeleteFavoritesParams {
  id: string
}

export interface IDeleteFavoritesUseCase {
  execute: (params: DeleteFavoritesParams) => Promise<void>
}
