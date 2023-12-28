export enum BillboardResponseErrorEnum {
  // BILLBOARD_EXIST = "Store already existing",
  BILLBOARD_NOT_EXIST = "Billboard has not been exist",
  BILLBOARD_NOT_UNIQUE = "Billboard has not been unique name",
  BILLBOARD_NOT_FOUND = "Billboard has not been found",
  BILLBOARD_NOT_CREATED = "Billboard has not been created",
  BILLBOARD_NOT_UPDATED = "Billboard has not been updated",
  BILLBOARD_NOT_REMOVED = "Billboard has not been removed",
  BILLBOARD_NO_OWNER = "You are not owner this billboard",

  RELATION_CAT_USE = "Some categories use this billboard, so it cannot be deleted.",
  //
  // BILLBOARD_SLUG_EMPTY = "Slug not must be empty",
  // BILLBOARD_LIST_NOT_FOUND = "Store list has not been found",
  // USER_NOT_FOUND = "User not found",
}
