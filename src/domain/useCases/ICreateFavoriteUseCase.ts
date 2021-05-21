export interface CreateFavoritesParams {
  favoriteId: string
  title: string
  img: string
}

export interface ICreateFavoritesUseCase {
  execute: (params: CreateFavoritesParams) => Promise<string>
}
