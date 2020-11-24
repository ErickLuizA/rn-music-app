export interface CreateFavoritesParams {
  musicId: string
  title: string
  img: string
}

export interface ICreateFavoritesUseCase {
  execute: (params: CreateFavoritesParams) => void
}
