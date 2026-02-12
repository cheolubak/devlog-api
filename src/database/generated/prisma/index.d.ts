
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model BlogSource
 * 
 */
export type BlogSource = $Result.DefaultSelection<Prisma.$BlogSourcePayload>
/**
 * Model Posts
 * 
 */
export type Posts = $Result.DefaultSelection<Prisma.$PostsPayload>
/**
 * Model Tags
 * 
 */
export type Tags = $Result.DefaultSelection<Prisma.$TagsPayload>
/**
 * Model PostTags
 * 
 */
export type PostTags = $Result.DefaultSelection<Prisma.$PostTagsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FeedType: {
  RSS: 'RSS',
  ATOM: 'ATOM',
  SCRAPING: 'SCRAPING'
};

export type FeedType = (typeof FeedType)[keyof typeof FeedType]


export const FetchStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PARTIAL: 'PARTIAL'
};

export type FetchStatus = (typeof FetchStatus)[keyof typeof FetchStatus]

}

export type FeedType = $Enums.FeedType

export const FeedType: typeof $Enums.FeedType

export type FetchStatus = $Enums.FetchStatus

export const FetchStatus: typeof $Enums.FetchStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BlogSources
 * const blogSources = await prisma.blogSource.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more BlogSources
   * const blogSources = await prisma.blogSource.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.blogSource`: Exposes CRUD operations for the **BlogSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogSources
    * const blogSources = await prisma.blogSource.findMany()
    * ```
    */
  get blogSource(): Prisma.BlogSourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.posts`: Exposes CRUD operations for the **Posts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.posts.findMany()
    * ```
    */
  get posts(): Prisma.PostsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tags`: Exposes CRUD operations for the **Tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tags.findMany()
    * ```
    */
  get tags(): Prisma.TagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postTags`: Exposes CRUD operations for the **PostTags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostTags
    * const postTags = await prisma.postTags.findMany()
    * ```
    */
  get postTags(): Prisma.PostTagsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    BlogSource: 'BlogSource',
    Posts: 'Posts',
    Tags: 'Tags',
    PostTags: 'PostTags'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "blogSource" | "posts" | "tags" | "postTags"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BlogSource: {
        payload: Prisma.$BlogSourcePayload<ExtArgs>
        fields: Prisma.BlogSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          findFirst: {
            args: Prisma.BlogSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          findMany: {
            args: Prisma.BlogSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>[]
          }
          create: {
            args: Prisma.BlogSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          createMany: {
            args: Prisma.BlogSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogSourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>[]
          }
          delete: {
            args: Prisma.BlogSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          update: {
            args: Prisma.BlogSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          deleteMany: {
            args: Prisma.BlogSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogSourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>[]
          }
          upsert: {
            args: Prisma.BlogSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogSourcePayload>
          }
          aggregate: {
            args: Prisma.BlogSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogSource>
          }
          groupBy: {
            args: Prisma.BlogSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogSourceCountArgs<ExtArgs>
            result: $Utils.Optional<BlogSourceCountAggregateOutputType> | number
          }
        }
      }
      Posts: {
        payload: Prisma.$PostsPayload<ExtArgs>
        fields: Prisma.PostsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          findFirst: {
            args: Prisma.PostsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          findMany: {
            args: Prisma.PostsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>[]
          }
          create: {
            args: Prisma.PostsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          createMany: {
            args: Prisma.PostsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>[]
          }
          delete: {
            args: Prisma.PostsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          update: {
            args: Prisma.PostsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          deleteMany: {
            args: Prisma.PostsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>[]
          }
          upsert: {
            args: Prisma.PostsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          aggregate: {
            args: Prisma.PostsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosts>
          }
          groupBy: {
            args: Prisma.PostsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostsCountArgs<ExtArgs>
            result: $Utils.Optional<PostsCountAggregateOutputType> | number
          }
        }
      }
      Tags: {
        payload: Prisma.$TagsPayload<ExtArgs>
        fields: Prisma.TagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          findFirst: {
            args: Prisma.TagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          findMany: {
            args: Prisma.TagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>[]
          }
          create: {
            args: Prisma.TagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          createMany: {
            args: Prisma.TagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>[]
          }
          delete: {
            args: Prisma.TagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          update: {
            args: Prisma.TagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          deleteMany: {
            args: Prisma.TagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>[]
          }
          upsert: {
            args: Prisma.TagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagsPayload>
          }
          aggregate: {
            args: Prisma.TagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTags>
          }
          groupBy: {
            args: Prisma.TagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagsCountArgs<ExtArgs>
            result: $Utils.Optional<TagsCountAggregateOutputType> | number
          }
        }
      }
      PostTags: {
        payload: Prisma.$PostTagsPayload<ExtArgs>
        fields: Prisma.PostTagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostTagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostTagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          findFirst: {
            args: Prisma.PostTagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostTagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          findMany: {
            args: Prisma.PostTagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>[]
          }
          create: {
            args: Prisma.PostTagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          createMany: {
            args: Prisma.PostTagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostTagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>[]
          }
          delete: {
            args: Prisma.PostTagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          update: {
            args: Prisma.PostTagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          deleteMany: {
            args: Prisma.PostTagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostTagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostTagsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>[]
          }
          upsert: {
            args: Prisma.PostTagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagsPayload>
          }
          aggregate: {
            args: Prisma.PostTagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostTags>
          }
          groupBy: {
            args: Prisma.PostTagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostTagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostTagsCountArgs<ExtArgs>
            result: $Utils.Optional<PostTagsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    blogSource?: BlogSourceOmit
    posts?: PostsOmit
    tags?: TagsOmit
    postTags?: PostTagsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BlogSourceCountOutputType
   */

  export type BlogSourceCountOutputType = {
    posts: number
  }

  export type BlogSourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogSourceCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * BlogSourceCountOutputType without action
   */
  export type BlogSourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSourceCountOutputType
     */
    select?: BlogSourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogSourceCountOutputType without action
   */
  export type BlogSourceCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostsWhereInput
  }


  /**
   * Count Type PostsCountOutputType
   */

  export type PostsCountOutputType = {
    postTags: number
  }

  export type PostsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postTags?: boolean | PostsCountOutputTypeCountPostTagsArgs
  }

  // Custom InputTypes
  /**
   * PostsCountOutputType without action
   */
  export type PostsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostsCountOutputType
     */
    select?: PostsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostsCountOutputType without action
   */
  export type PostsCountOutputTypeCountPostTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagsWhereInput
  }


  /**
   * Count Type TagsCountOutputType
   */

  export type TagsCountOutputType = {
    postTags: number
  }

  export type TagsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postTags?: boolean | TagsCountOutputTypeCountPostTagsArgs
  }

  // Custom InputTypes
  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagsCountOutputType
     */
    select?: TagsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeCountPostTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model BlogSource
   */

  export type AggregateBlogSource = {
    _count: BlogSourceCountAggregateOutputType | null
    _avg: BlogSourceAvgAggregateOutputType | null
    _sum: BlogSourceSumAggregateOutputType | null
    _min: BlogSourceMinAggregateOutputType | null
    _max: BlogSourceMaxAggregateOutputType | null
  }

  export type BlogSourceAvgAggregateOutputType = {
    totalPostsFetched: number | null
  }

  export type BlogSourceSumAggregateOutputType = {
    totalPostsFetched: number | null
  }

  export type BlogSourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: $Enums.FeedType | null
    icon: string | null
    isActive: boolean | null
    lastFetchedAt: Date | null
    lastFetchStatus: $Enums.FetchStatus | null
    lastFetchError: string | null
    totalPostsFetched: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogSourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: $Enums.FeedType | null
    icon: string | null
    isActive: boolean | null
    lastFetchedAt: Date | null
    lastFetchStatus: $Enums.FetchStatus | null
    lastFetchError: string | null
    totalPostsFetched: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogSourceCountAggregateOutputType = {
    id: number
    name: number
    url: number
    type: number
    scrapingConfig: number
    icon: number
    isActive: number
    lastFetchedAt: number
    lastFetchStatus: number
    lastFetchError: number
    totalPostsFetched: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogSourceAvgAggregateInputType = {
    totalPostsFetched?: true
  }

  export type BlogSourceSumAggregateInputType = {
    totalPostsFetched?: true
  }

  export type BlogSourceMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    icon?: true
    isActive?: true
    lastFetchedAt?: true
    lastFetchStatus?: true
    lastFetchError?: true
    totalPostsFetched?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogSourceMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    icon?: true
    isActive?: true
    lastFetchedAt?: true
    lastFetchStatus?: true
    lastFetchError?: true
    totalPostsFetched?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogSourceCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    scrapingConfig?: true
    icon?: true
    isActive?: true
    lastFetchedAt?: true
    lastFetchStatus?: true
    lastFetchError?: true
    totalPostsFetched?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogSource to aggregate.
     */
    where?: BlogSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogSources to fetch.
     */
    orderBy?: BlogSourceOrderByWithRelationInput | BlogSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogSources
    **/
    _count?: true | BlogSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogSourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogSourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogSourceMaxAggregateInputType
  }

  export type GetBlogSourceAggregateType<T extends BlogSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogSource[P]>
      : GetScalarType<T[P], AggregateBlogSource[P]>
  }




  export type BlogSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogSourceWhereInput
    orderBy?: BlogSourceOrderByWithAggregationInput | BlogSourceOrderByWithAggregationInput[]
    by: BlogSourceScalarFieldEnum[] | BlogSourceScalarFieldEnum
    having?: BlogSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogSourceCountAggregateInputType | true
    _avg?: BlogSourceAvgAggregateInputType
    _sum?: BlogSourceSumAggregateInputType
    _min?: BlogSourceMinAggregateInputType
    _max?: BlogSourceMaxAggregateInputType
  }

  export type BlogSourceGroupByOutputType = {
    id: string
    name: string
    url: string
    type: $Enums.FeedType
    scrapingConfig: JsonValue | null
    icon: string | null
    isActive: boolean
    lastFetchedAt: Date | null
    lastFetchStatus: $Enums.FetchStatus
    lastFetchError: string | null
    totalPostsFetched: number
    createdAt: Date
    updatedAt: Date
    _count: BlogSourceCountAggregateOutputType | null
    _avg: BlogSourceAvgAggregateOutputType | null
    _sum: BlogSourceSumAggregateOutputType | null
    _min: BlogSourceMinAggregateOutputType | null
    _max: BlogSourceMaxAggregateOutputType | null
  }

  type GetBlogSourceGroupByPayload<T extends BlogSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogSourceGroupByOutputType[P]>
            : GetScalarType<T[P], BlogSourceGroupByOutputType[P]>
        }
      >
    >


  export type BlogSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    scrapingConfig?: boolean
    icon?: boolean
    isActive?: boolean
    lastFetchedAt?: boolean
    lastFetchStatus?: boolean
    lastFetchError?: boolean
    totalPostsFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    posts?: boolean | BlogSource$postsArgs<ExtArgs>
    _count?: boolean | BlogSourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogSource"]>

  export type BlogSourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    scrapingConfig?: boolean
    icon?: boolean
    isActive?: boolean
    lastFetchedAt?: boolean
    lastFetchStatus?: boolean
    lastFetchError?: boolean
    totalPostsFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogSource"]>

  export type BlogSourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    scrapingConfig?: boolean
    icon?: boolean
    isActive?: boolean
    lastFetchedAt?: boolean
    lastFetchStatus?: boolean
    lastFetchError?: boolean
    totalPostsFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogSource"]>

  export type BlogSourceSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    scrapingConfig?: boolean
    icon?: boolean
    isActive?: boolean
    lastFetchedAt?: boolean
    lastFetchStatus?: boolean
    lastFetchError?: boolean
    totalPostsFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BlogSourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "type" | "scrapingConfig" | "icon" | "isActive" | "lastFetchedAt" | "lastFetchStatus" | "lastFetchError" | "totalPostsFetched" | "createdAt" | "updatedAt", ExtArgs["result"]["blogSource"]>
  export type BlogSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogSource$postsArgs<ExtArgs>
    _count?: boolean | BlogSourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlogSourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BlogSourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BlogSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogSource"
    objects: {
      posts: Prisma.$PostsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      type: $Enums.FeedType
      scrapingConfig: Prisma.JsonValue | null
      icon: string | null
      isActive: boolean
      lastFetchedAt: Date | null
      lastFetchStatus: $Enums.FetchStatus
      lastFetchError: string | null
      totalPostsFetched: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blogSource"]>
    composites: {}
  }

  type BlogSourceGetPayload<S extends boolean | null | undefined | BlogSourceDefaultArgs> = $Result.GetResult<Prisma.$BlogSourcePayload, S>

  type BlogSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: BlogSourceCountAggregateInputType | true
    }

  export interface BlogSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogSource'], meta: { name: 'BlogSource' } }
    /**
     * Find zero or one BlogSource that matches the filter.
     * @param {BlogSourceFindUniqueArgs} args - Arguments to find a BlogSource
     * @example
     * // Get one BlogSource
     * const blogSource = await prisma.blogSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogSourceFindUniqueArgs>(args: SelectSubset<T, BlogSourceFindUniqueArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogSourceFindUniqueOrThrowArgs} args - Arguments to find a BlogSource
     * @example
     * // Get one BlogSource
     * const blogSource = await prisma.blogSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceFindFirstArgs} args - Arguments to find a BlogSource
     * @example
     * // Get one BlogSource
     * const blogSource = await prisma.blogSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogSourceFindFirstArgs>(args?: SelectSubset<T, BlogSourceFindFirstArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceFindFirstOrThrowArgs} args - Arguments to find a BlogSource
     * @example
     * // Get one BlogSource
     * const blogSource = await prisma.blogSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogSources
     * const blogSources = await prisma.blogSource.findMany()
     * 
     * // Get first 10 BlogSources
     * const blogSources = await prisma.blogSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogSourceWithIdOnly = await prisma.blogSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogSourceFindManyArgs>(args?: SelectSubset<T, BlogSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogSource.
     * @param {BlogSourceCreateArgs} args - Arguments to create a BlogSource.
     * @example
     * // Create one BlogSource
     * const BlogSource = await prisma.blogSource.create({
     *   data: {
     *     // ... data to create a BlogSource
     *   }
     * })
     * 
     */
    create<T extends BlogSourceCreateArgs>(args: SelectSubset<T, BlogSourceCreateArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogSources.
     * @param {BlogSourceCreateManyArgs} args - Arguments to create many BlogSources.
     * @example
     * // Create many BlogSources
     * const blogSource = await prisma.blogSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogSourceCreateManyArgs>(args?: SelectSubset<T, BlogSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogSources and returns the data saved in the database.
     * @param {BlogSourceCreateManyAndReturnArgs} args - Arguments to create many BlogSources.
     * @example
     * // Create many BlogSources
     * const blogSource = await prisma.blogSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogSources and only return the `id`
     * const blogSourceWithIdOnly = await prisma.blogSource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogSourceCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlogSource.
     * @param {BlogSourceDeleteArgs} args - Arguments to delete one BlogSource.
     * @example
     * // Delete one BlogSource
     * const BlogSource = await prisma.blogSource.delete({
     *   where: {
     *     // ... filter to delete one BlogSource
     *   }
     * })
     * 
     */
    delete<T extends BlogSourceDeleteArgs>(args: SelectSubset<T, BlogSourceDeleteArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogSource.
     * @param {BlogSourceUpdateArgs} args - Arguments to update one BlogSource.
     * @example
     * // Update one BlogSource
     * const blogSource = await prisma.blogSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogSourceUpdateArgs>(args: SelectSubset<T, BlogSourceUpdateArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogSources.
     * @param {BlogSourceDeleteManyArgs} args - Arguments to filter BlogSources to delete.
     * @example
     * // Delete a few BlogSources
     * const { count } = await prisma.blogSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogSourceDeleteManyArgs>(args?: SelectSubset<T, BlogSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogSources
     * const blogSource = await prisma.blogSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogSourceUpdateManyArgs>(args: SelectSubset<T, BlogSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogSources and returns the data updated in the database.
     * @param {BlogSourceUpdateManyAndReturnArgs} args - Arguments to update many BlogSources.
     * @example
     * // Update many BlogSources
     * const blogSource = await prisma.blogSource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlogSources and only return the `id`
     * const blogSourceWithIdOnly = await prisma.blogSource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlogSourceUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlogSource.
     * @param {BlogSourceUpsertArgs} args - Arguments to update or create a BlogSource.
     * @example
     * // Update or create a BlogSource
     * const blogSource = await prisma.blogSource.upsert({
     *   create: {
     *     // ... data to create a BlogSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogSource we want to update
     *   }
     * })
     */
    upsert<T extends BlogSourceUpsertArgs>(args: SelectSubset<T, BlogSourceUpsertArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceCountArgs} args - Arguments to filter BlogSources to count.
     * @example
     * // Count the number of BlogSources
     * const count = await prisma.blogSource.count({
     *   where: {
     *     // ... the filter for the BlogSources we want to count
     *   }
     * })
    **/
    count<T extends BlogSourceCountArgs>(
      args?: Subset<T, BlogSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogSourceAggregateArgs>(args: Subset<T, BlogSourceAggregateArgs>): Prisma.PrismaPromise<GetBlogSourceAggregateType<T>>

    /**
     * Group by BlogSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogSourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogSourceGroupByArgs['orderBy'] }
        : { orderBy?: BlogSourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogSource model
   */
  readonly fields: BlogSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends BlogSource$postsArgs<ExtArgs> = {}>(args?: Subset<T, BlogSource$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogSource model
   */
  interface BlogSourceFieldRefs {
    readonly id: FieldRef<"BlogSource", 'String'>
    readonly name: FieldRef<"BlogSource", 'String'>
    readonly url: FieldRef<"BlogSource", 'String'>
    readonly type: FieldRef<"BlogSource", 'FeedType'>
    readonly scrapingConfig: FieldRef<"BlogSource", 'Json'>
    readonly icon: FieldRef<"BlogSource", 'String'>
    readonly isActive: FieldRef<"BlogSource", 'Boolean'>
    readonly lastFetchedAt: FieldRef<"BlogSource", 'DateTime'>
    readonly lastFetchStatus: FieldRef<"BlogSource", 'FetchStatus'>
    readonly lastFetchError: FieldRef<"BlogSource", 'String'>
    readonly totalPostsFetched: FieldRef<"BlogSource", 'Int'>
    readonly createdAt: FieldRef<"BlogSource", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogSource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogSource findUnique
   */
  export type BlogSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter, which BlogSource to fetch.
     */
    where: BlogSourceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource findUniqueOrThrow
   */
  export type BlogSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter, which BlogSource to fetch.
     */
    where: BlogSourceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource findFirst
   */
  export type BlogSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter, which BlogSource to fetch.
     */
    where?: BlogSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogSources to fetch.
     */
    orderBy?: BlogSourceOrderByWithRelationInput | BlogSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogSources.
     */
    cursor?: BlogSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogSources.
     */
    distinct?: BlogSourceScalarFieldEnum | BlogSourceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource findFirstOrThrow
   */
  export type BlogSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter, which BlogSource to fetch.
     */
    where?: BlogSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogSources to fetch.
     */
    orderBy?: BlogSourceOrderByWithRelationInput | BlogSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogSources.
     */
    cursor?: BlogSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogSources.
     */
    distinct?: BlogSourceScalarFieldEnum | BlogSourceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource findMany
   */
  export type BlogSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter, which BlogSources to fetch.
     */
    where?: BlogSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogSources to fetch.
     */
    orderBy?: BlogSourceOrderByWithRelationInput | BlogSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogSources.
     */
    cursor?: BlogSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogSources.
     */
    skip?: number
    distinct?: BlogSourceScalarFieldEnum | BlogSourceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource create
   */
  export type BlogSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogSource.
     */
    data: XOR<BlogSourceCreateInput, BlogSourceUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource createMany
   */
  export type BlogSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogSources.
     */
    data: BlogSourceCreateManyInput | BlogSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogSource createManyAndReturn
   */
  export type BlogSourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * The data used to create many BlogSources.
     */
    data: BlogSourceCreateManyInput | BlogSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogSource update
   */
  export type BlogSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogSource.
     */
    data: XOR<BlogSourceUpdateInput, BlogSourceUncheckedUpdateInput>
    /**
     * Choose, which BlogSource to update.
     */
    where: BlogSourceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource updateMany
   */
  export type BlogSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogSources.
     */
    data: XOR<BlogSourceUpdateManyMutationInput, BlogSourceUncheckedUpdateManyInput>
    /**
     * Filter which BlogSources to update
     */
    where?: BlogSourceWhereInput
    /**
     * Limit how many BlogSources to update.
     */
    limit?: number
  }

  /**
   * BlogSource updateManyAndReturn
   */
  export type BlogSourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * The data used to update BlogSources.
     */
    data: XOR<BlogSourceUpdateManyMutationInput, BlogSourceUncheckedUpdateManyInput>
    /**
     * Filter which BlogSources to update
     */
    where?: BlogSourceWhereInput
    /**
     * Limit how many BlogSources to update.
     */
    limit?: number
  }

  /**
   * BlogSource upsert
   */
  export type BlogSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogSource to update in case it exists.
     */
    where: BlogSourceWhereUniqueInput
    /**
     * In case the BlogSource found by the `where` argument doesn't exist, create a new BlogSource with this data.
     */
    create: XOR<BlogSourceCreateInput, BlogSourceUncheckedCreateInput>
    /**
     * In case the BlogSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogSourceUpdateInput, BlogSourceUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource delete
   */
  export type BlogSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    /**
     * Filter which BlogSource to delete.
     */
    where: BlogSourceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BlogSource deleteMany
   */
  export type BlogSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogSources to delete
     */
    where?: BlogSourceWhereInput
    /**
     * Limit how many BlogSources to delete.
     */
    limit?: number
  }

  /**
   * BlogSource.posts
   */
  export type BlogSource$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    where?: PostsWhereInput
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    cursor?: PostsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
  }

  /**
   * BlogSource without action
   */
  export type BlogSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
  }


  /**
   * Model Posts
   */

  export type AggregatePosts = {
    _count: PostsCountAggregateOutputType | null
    _min: PostsMinAggregateOutputType | null
    _max: PostsMaxAggregateOutputType | null
  }

  export type PostsMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    isDisplay: boolean | null
    tags: string | null
    sourceId: string | null
    sourceUrl: string | null
    originalPublishedAt: Date | null
    originalAuthor: string | null
    description: string | null
    imageUrl: string | null
    contentHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    isDisplay: boolean | null
    tags: string | null
    sourceId: string | null
    sourceUrl: string | null
    originalPublishedAt: Date | null
    originalAuthor: string | null
    description: string | null
    imageUrl: string | null
    contentHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostsCountAggregateOutputType = {
    id: number
    title: number
    content: number
    isDisplay: number
    tags: number
    sourceId: number
    sourceUrl: number
    originalPublishedAt: number
    originalAuthor: number
    description: number
    imageUrl: number
    rawFeedData: number
    contentHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostsMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isDisplay?: true
    tags?: true
    sourceId?: true
    sourceUrl?: true
    originalPublishedAt?: true
    originalAuthor?: true
    description?: true
    imageUrl?: true
    contentHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostsMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isDisplay?: true
    tags?: true
    sourceId?: true
    sourceUrl?: true
    originalPublishedAt?: true
    originalAuthor?: true
    description?: true
    imageUrl?: true
    contentHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostsCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    isDisplay?: true
    tags?: true
    sourceId?: true
    sourceUrl?: true
    originalPublishedAt?: true
    originalAuthor?: true
    description?: true
    imageUrl?: true
    rawFeedData?: true
    contentHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to aggregate.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostsMaxAggregateInputType
  }

  export type GetPostsAggregateType<T extends PostsAggregateArgs> = {
        [P in keyof T & keyof AggregatePosts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosts[P]>
      : GetScalarType<T[P], AggregatePosts[P]>
  }




  export type PostsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostsWhereInput
    orderBy?: PostsOrderByWithAggregationInput | PostsOrderByWithAggregationInput[]
    by: PostsScalarFieldEnum[] | PostsScalarFieldEnum
    having?: PostsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostsCountAggregateInputType | true
    _min?: PostsMinAggregateInputType
    _max?: PostsMaxAggregateInputType
  }

  export type PostsGroupByOutputType = {
    id: string
    title: string
    content: string
    isDisplay: boolean
    tags: string | null
    sourceId: string | null
    sourceUrl: string | null
    originalPublishedAt: Date | null
    originalAuthor: string | null
    description: string | null
    imageUrl: string | null
    rawFeedData: JsonValue | null
    contentHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: PostsCountAggregateOutputType | null
    _min: PostsMinAggregateOutputType | null
    _max: PostsMaxAggregateOutputType | null
  }

  type GetPostsGroupByPayload<T extends PostsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostsGroupByOutputType[P]>
            : GetScalarType<T[P], PostsGroupByOutputType[P]>
        }
      >
    >


  export type PostsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    isDisplay?: boolean
    tags?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    originalPublishedAt?: boolean
    originalAuthor?: boolean
    description?: boolean
    imageUrl?: boolean
    rawFeedData?: boolean
    contentHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postTags?: boolean | Posts$postTagsArgs<ExtArgs>
    source?: boolean | Posts$sourceArgs<ExtArgs>
    _count?: boolean | PostsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posts"]>

  export type PostsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    isDisplay?: boolean
    tags?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    originalPublishedAt?: boolean
    originalAuthor?: boolean
    description?: boolean
    imageUrl?: boolean
    rawFeedData?: boolean
    contentHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean | Posts$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["posts"]>

  export type PostsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    isDisplay?: boolean
    tags?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    originalPublishedAt?: boolean
    originalAuthor?: boolean
    description?: boolean
    imageUrl?: boolean
    rawFeedData?: boolean
    contentHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean | Posts$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["posts"]>

  export type PostsSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    isDisplay?: boolean
    tags?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    originalPublishedAt?: boolean
    originalAuthor?: boolean
    description?: boolean
    imageUrl?: boolean
    rawFeedData?: boolean
    contentHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "isDisplay" | "tags" | "sourceId" | "sourceUrl" | "originalPublishedAt" | "originalAuthor" | "description" | "imageUrl" | "rawFeedData" | "contentHash" | "createdAt" | "updatedAt", ExtArgs["result"]["posts"]>
  export type PostsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postTags?: boolean | Posts$postTagsArgs<ExtArgs>
    source?: boolean | Posts$sourceArgs<ExtArgs>
    _count?: boolean | PostsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | Posts$sourceArgs<ExtArgs>
  }
  export type PostsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | Posts$sourceArgs<ExtArgs>
  }

  export type $PostsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Posts"
    objects: {
      postTags: Prisma.$PostTagsPayload<ExtArgs>[]
      source: Prisma.$BlogSourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      isDisplay: boolean
      tags: string | null
      sourceId: string | null
      sourceUrl: string | null
      originalPublishedAt: Date | null
      originalAuthor: string | null
      description: string | null
      imageUrl: string | null
      rawFeedData: Prisma.JsonValue | null
      contentHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["posts"]>
    composites: {}
  }

  type PostsGetPayload<S extends boolean | null | undefined | PostsDefaultArgs> = $Result.GetResult<Prisma.$PostsPayload, S>

  type PostsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PostsCountAggregateInputType | true
    }

  export interface PostsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Posts'], meta: { name: 'Posts' } }
    /**
     * Find zero or one Posts that matches the filter.
     * @param {PostsFindUniqueArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostsFindUniqueArgs>(args: SelectSubset<T, PostsFindUniqueArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Posts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostsFindUniqueOrThrowArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindFirstArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostsFindFirstArgs>(args?: SelectSubset<T, PostsFindFirstArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Posts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindFirstOrThrowArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.posts.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.posts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postsWithIdOnly = await prisma.posts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostsFindManyArgs>(args?: SelectSubset<T, PostsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Posts.
     * @param {PostsCreateArgs} args - Arguments to create a Posts.
     * @example
     * // Create one Posts
     * const Posts = await prisma.posts.create({
     *   data: {
     *     // ... data to create a Posts
     *   }
     * })
     * 
     */
    create<T extends PostsCreateArgs>(args: SelectSubset<T, PostsCreateArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostsCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const posts = await prisma.posts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostsCreateManyArgs>(args?: SelectSubset<T, PostsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostsCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const posts = await prisma.posts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postsWithIdOnly = await prisma.posts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Posts.
     * @param {PostsDeleteArgs} args - Arguments to delete one Posts.
     * @example
     * // Delete one Posts
     * const Posts = await prisma.posts.delete({
     *   where: {
     *     // ... filter to delete one Posts
     *   }
     * })
     * 
     */
    delete<T extends PostsDeleteArgs>(args: SelectSubset<T, PostsDeleteArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Posts.
     * @param {PostsUpdateArgs} args - Arguments to update one Posts.
     * @example
     * // Update one Posts
     * const posts = await prisma.posts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostsUpdateArgs>(args: SelectSubset<T, PostsUpdateArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostsDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.posts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostsDeleteManyArgs>(args?: SelectSubset<T, PostsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const posts = await prisma.posts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostsUpdateManyArgs>(args: SelectSubset<T, PostsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostsUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const posts = await prisma.posts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postsWithIdOnly = await prisma.posts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Posts.
     * @param {PostsUpsertArgs} args - Arguments to update or create a Posts.
     * @example
     * // Update or create a Posts
     * const posts = await prisma.posts.upsert({
     *   create: {
     *     // ... data to create a Posts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Posts we want to update
     *   }
     * })
     */
    upsert<T extends PostsUpsertArgs>(args: SelectSubset<T, PostsUpsertArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.posts.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostsCountArgs>(
      args?: Subset<T, PostsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostsAggregateArgs>(args: Subset<T, PostsAggregateArgs>): Prisma.PrismaPromise<GetPostsAggregateType<T>>

    /**
     * Group by Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostsGroupByArgs['orderBy'] }
        : { orderBy?: PostsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Posts model
   */
  readonly fields: PostsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Posts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    postTags<T extends Posts$postTagsArgs<ExtArgs> = {}>(args?: Subset<T, Posts$postTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    source<T extends Posts$sourceArgs<ExtArgs> = {}>(args?: Subset<T, Posts$sourceArgs<ExtArgs>>): Prisma__BlogSourceClient<$Result.GetResult<Prisma.$BlogSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Posts model
   */
  interface PostsFieldRefs {
    readonly id: FieldRef<"Posts", 'String'>
    readonly title: FieldRef<"Posts", 'String'>
    readonly content: FieldRef<"Posts", 'String'>
    readonly isDisplay: FieldRef<"Posts", 'Boolean'>
    readonly tags: FieldRef<"Posts", 'String'>
    readonly sourceId: FieldRef<"Posts", 'String'>
    readonly sourceUrl: FieldRef<"Posts", 'String'>
    readonly originalPublishedAt: FieldRef<"Posts", 'DateTime'>
    readonly originalAuthor: FieldRef<"Posts", 'String'>
    readonly description: FieldRef<"Posts", 'String'>
    readonly imageUrl: FieldRef<"Posts", 'String'>
    readonly rawFeedData: FieldRef<"Posts", 'Json'>
    readonly contentHash: FieldRef<"Posts", 'String'>
    readonly createdAt: FieldRef<"Posts", 'DateTime'>
    readonly updatedAt: FieldRef<"Posts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Posts findUnique
   */
  export type PostsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where: PostsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts findUniqueOrThrow
   */
  export type PostsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where: PostsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts findFirst
   */
  export type PostsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts findFirstOrThrow
   */
  export type PostsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts findMany
   */
  export type PostsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts create
   */
  export type PostsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The data needed to create a Posts.
     */
    data: XOR<PostsCreateInput, PostsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts createMany
   */
  export type PostsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostsCreateManyInput | PostsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Posts createManyAndReturn
   */
  export type PostsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostsCreateManyInput | PostsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Posts update
   */
  export type PostsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The data needed to update a Posts.
     */
    data: XOR<PostsUpdateInput, PostsUncheckedUpdateInput>
    /**
     * Choose, which Posts to update.
     */
    where: PostsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts updateMany
   */
  export type PostsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostsUpdateManyMutationInput, PostsUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostsWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Posts updateManyAndReturn
   */
  export type PostsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostsUpdateManyMutationInput, PostsUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostsWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Posts upsert
   */
  export type PostsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The filter to search for the Posts to update in case it exists.
     */
    where: PostsWhereUniqueInput
    /**
     * In case the Posts found by the `where` argument doesn't exist, create a new Posts with this data.
     */
    create: XOR<PostsCreateInput, PostsUncheckedCreateInput>
    /**
     * In case the Posts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostsUpdateInput, PostsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts delete
   */
  export type PostsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter which Posts to delete.
     */
    where: PostsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Posts deleteMany
   */
  export type PostsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostsWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Posts.postTags
   */
  export type Posts$postTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    where?: PostTagsWhereInput
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    cursor?: PostTagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostTagsScalarFieldEnum | PostTagsScalarFieldEnum[]
  }

  /**
   * Posts.source
   */
  export type Posts$sourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogSource
     */
    select?: BlogSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogSource
     */
    omit?: BlogSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogSourceInclude<ExtArgs> | null
    where?: BlogSourceWhereInput
  }

  /**
   * Posts without action
   */
  export type PostsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
  }


  /**
   * Model Tags
   */

  export type AggregateTags = {
    _count: TagsCountAggregateOutputType | null
    _avg: TagsAvgAggregateOutputType | null
    _sum: TagsSumAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  export type TagsAvgAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type TagsSumAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type TagsMinAggregateOutputType = {
    id: number | null
    name: string | null
    count: number | null
  }

  export type TagsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    count: number | null
  }

  export type TagsCountAggregateOutputType = {
    id: number
    name: number
    count: number
    _all: number
  }


  export type TagsAvgAggregateInputType = {
    id?: true
    count?: true
  }

  export type TagsSumAggregateInputType = {
    id?: true
    count?: true
  }

  export type TagsMinAggregateInputType = {
    id?: true
    name?: true
    count?: true
  }

  export type TagsMaxAggregateInputType = {
    id?: true
    name?: true
    count?: true
  }

  export type TagsCountAggregateInputType = {
    id?: true
    name?: true
    count?: true
    _all?: true
  }

  export type TagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to aggregate.
     */
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagsOrderByWithRelationInput | TagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsMaxAggregateInputType
  }

  export type GetTagsAggregateType<T extends TagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTags[P]>
      : GetScalarType<T[P], AggregateTags[P]>
  }




  export type TagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagsWhereInput
    orderBy?: TagsOrderByWithAggregationInput | TagsOrderByWithAggregationInput[]
    by: TagsScalarFieldEnum[] | TagsScalarFieldEnum
    having?: TagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsCountAggregateInputType | true
    _avg?: TagsAvgAggregateInputType
    _sum?: TagsSumAggregateInputType
    _min?: TagsMinAggregateInputType
    _max?: TagsMaxAggregateInputType
  }

  export type TagsGroupByOutputType = {
    id: number
    name: string
    count: number
    _count: TagsCountAggregateOutputType | null
    _avg: TagsAvgAggregateOutputType | null
    _sum: TagsSumAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  type GetTagsGroupByPayload<T extends TagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupByOutputType[P]>
        }
      >
    >


  export type TagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    count?: boolean
    postTags?: boolean | Tags$postTagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>

  export type TagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    count?: boolean
  }, ExtArgs["result"]["tags"]>

  export type TagsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    count?: boolean
  }, ExtArgs["result"]["tags"]>

  export type TagsSelectScalar = {
    id?: boolean
    name?: boolean
    count?: boolean
  }

  export type TagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "count", ExtArgs["result"]["tags"]>
  export type TagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postTags?: boolean | Tags$postTagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tags"
    objects: {
      postTags: Prisma.$PostTagsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      count: number
    }, ExtArgs["result"]["tags"]>
    composites: {}
  }

  type TagsGetPayload<S extends boolean | null | undefined | TagsDefaultArgs> = $Result.GetResult<Prisma.$TagsPayload, S>

  type TagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TagsCountAggregateInputType | true
    }

  export interface TagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tags'], meta: { name: 'Tags' } }
    /**
     * Find zero or one Tags that matches the filter.
     * @param {TagsFindUniqueArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagsFindUniqueArgs>(args: SelectSubset<T, TagsFindUniqueArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagsFindUniqueOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagsFindUniqueOrThrowArgs>(args: SelectSubset<T, TagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindFirstArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagsFindFirstArgs>(args?: SelectSubset<T, TagsFindFirstArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindFirstOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagsFindFirstOrThrowArgs>(args?: SelectSubset<T, TagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tags.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tags.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagsWithIdOnly = await prisma.tags.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagsFindManyArgs>(args?: SelectSubset<T, TagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tags.
     * @param {TagsCreateArgs} args - Arguments to create a Tags.
     * @example
     * // Create one Tags
     * const Tags = await prisma.tags.create({
     *   data: {
     *     // ... data to create a Tags
     *   }
     * })
     * 
     */
    create<T extends TagsCreateArgs>(args: SelectSubset<T, TagsCreateArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagsCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagsCreateManyArgs>(args?: SelectSubset<T, TagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagsCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagsWithIdOnly = await prisma.tags.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagsCreateManyAndReturnArgs>(args?: SelectSubset<T, TagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tags.
     * @param {TagsDeleteArgs} args - Arguments to delete one Tags.
     * @example
     * // Delete one Tags
     * const Tags = await prisma.tags.delete({
     *   where: {
     *     // ... filter to delete one Tags
     *   }
     * })
     * 
     */
    delete<T extends TagsDeleteArgs>(args: SelectSubset<T, TagsDeleteArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tags.
     * @param {TagsUpdateArgs} args - Arguments to update one Tags.
     * @example
     * // Update one Tags
     * const tags = await prisma.tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagsUpdateArgs>(args: SelectSubset<T, TagsUpdateArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagsDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagsDeleteManyArgs>(args?: SelectSubset<T, TagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagsUpdateManyArgs>(args: SelectSubset<T, TagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagsUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagsWithIdOnly = await prisma.tags.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagsUpdateManyAndReturnArgs>(args: SelectSubset<T, TagsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tags.
     * @param {TagsUpsertArgs} args - Arguments to update or create a Tags.
     * @example
     * // Update or create a Tags
     * const tags = await prisma.tags.upsert({
     *   create: {
     *     // ... data to create a Tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tags we want to update
     *   }
     * })
     */
    upsert<T extends TagsUpsertArgs>(args: SelectSubset<T, TagsUpsertArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tags.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagsCountArgs>(
      args?: Subset<T, TagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagsAggregateArgs>(args: Subset<T, TagsAggregateArgs>): Prisma.PrismaPromise<GetTagsAggregateType<T>>

    /**
     * Group by Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagsGroupByArgs['orderBy'] }
        : { orderBy?: TagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tags model
   */
  readonly fields: TagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    postTags<T extends Tags$postTagsArgs<ExtArgs> = {}>(args?: Subset<T, Tags$postTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tags model
   */
  interface TagsFieldRefs {
    readonly id: FieldRef<"Tags", 'Int'>
    readonly name: FieldRef<"Tags", 'String'>
    readonly count: FieldRef<"Tags", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Tags findUnique
   */
  export type TagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where: TagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags findUniqueOrThrow
   */
  export type TagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where: TagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags findFirst
   */
  export type TagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagsOrderByWithRelationInput | TagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags findFirstOrThrow
   */
  export type TagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagsOrderByWithRelationInput | TagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags findMany
   */
  export type TagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagsOrderByWithRelationInput | TagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags create
   */
  export type TagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * The data needed to create a Tags.
     */
    data: XOR<TagsCreateInput, TagsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags createMany
   */
  export type TagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagsCreateManyInput | TagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tags createManyAndReturn
   */
  export type TagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagsCreateManyInput | TagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tags update
   */
  export type TagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * The data needed to update a Tags.
     */
    data: XOR<TagsUpdateInput, TagsUncheckedUpdateInput>
    /**
     * Choose, which Tags to update.
     */
    where: TagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags updateMany
   */
  export type TagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagsUpdateManyMutationInput, TagsUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagsWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tags updateManyAndReturn
   */
  export type TagsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagsUpdateManyMutationInput, TagsUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagsWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tags upsert
   */
  export type TagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * The filter to search for the Tags to update in case it exists.
     */
    where: TagsWhereUniqueInput
    /**
     * In case the Tags found by the `where` argument doesn't exist, create a new Tags with this data.
     */
    create: XOR<TagsCreateInput, TagsUncheckedCreateInput>
    /**
     * In case the Tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagsUpdateInput, TagsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags delete
   */
  export type TagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
    /**
     * Filter which Tags to delete.
     */
    where: TagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Tags deleteMany
   */
  export type TagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagsWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tags.postTags
   */
  export type Tags$postTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    where?: PostTagsWhereInput
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    cursor?: PostTagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostTagsScalarFieldEnum | PostTagsScalarFieldEnum[]
  }

  /**
   * Tags without action
   */
  export type TagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tags
     */
    select?: TagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tags
     */
    omit?: TagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagsInclude<ExtArgs> | null
  }


  /**
   * Model PostTags
   */

  export type AggregatePostTags = {
    _count: PostTagsCountAggregateOutputType | null
    _avg: PostTagsAvgAggregateOutputType | null
    _sum: PostTagsSumAggregateOutputType | null
    _min: PostTagsMinAggregateOutputType | null
    _max: PostTagsMaxAggregateOutputType | null
  }

  export type PostTagsAvgAggregateOutputType = {
    tagId: number | null
  }

  export type PostTagsSumAggregateOutputType = {
    tagId: number | null
  }

  export type PostTagsMinAggregateOutputType = {
    postId: string | null
    tagId: number | null
    createdAt: Date | null
  }

  export type PostTagsMaxAggregateOutputType = {
    postId: string | null
    tagId: number | null
    createdAt: Date | null
  }

  export type PostTagsCountAggregateOutputType = {
    postId: number
    tagId: number
    createdAt: number
    _all: number
  }


  export type PostTagsAvgAggregateInputType = {
    tagId?: true
  }

  export type PostTagsSumAggregateInputType = {
    tagId?: true
  }

  export type PostTagsMinAggregateInputType = {
    postId?: true
    tagId?: true
    createdAt?: true
  }

  export type PostTagsMaxAggregateInputType = {
    postId?: true
    tagId?: true
    createdAt?: true
  }

  export type PostTagsCountAggregateInputType = {
    postId?: true
    tagId?: true
    createdAt?: true
    _all?: true
  }

  export type PostTagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTags to aggregate.
     */
    where?: PostTagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostTagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostTags
    **/
    _count?: true | PostTagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostTagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostTagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostTagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostTagsMaxAggregateInputType
  }

  export type GetPostTagsAggregateType<T extends PostTagsAggregateArgs> = {
        [P in keyof T & keyof AggregatePostTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostTags[P]>
      : GetScalarType<T[P], AggregatePostTags[P]>
  }




  export type PostTagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagsWhereInput
    orderBy?: PostTagsOrderByWithAggregationInput | PostTagsOrderByWithAggregationInput[]
    by: PostTagsScalarFieldEnum[] | PostTagsScalarFieldEnum
    having?: PostTagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostTagsCountAggregateInputType | true
    _avg?: PostTagsAvgAggregateInputType
    _sum?: PostTagsSumAggregateInputType
    _min?: PostTagsMinAggregateInputType
    _max?: PostTagsMaxAggregateInputType
  }

  export type PostTagsGroupByOutputType = {
    postId: string
    tagId: number
    createdAt: Date
    _count: PostTagsCountAggregateOutputType | null
    _avg: PostTagsAvgAggregateOutputType | null
    _sum: PostTagsSumAggregateOutputType | null
    _min: PostTagsMinAggregateOutputType | null
    _max: PostTagsMaxAggregateOutputType | null
  }

  type GetPostTagsGroupByPayload<T extends PostTagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostTagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostTagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostTagsGroupByOutputType[P]>
            : GetScalarType<T[P], PostTagsGroupByOutputType[P]>
        }
      >
    >


  export type PostTagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postId?: boolean
    tagId?: boolean
    createdAt?: boolean
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTags"]>

  export type PostTagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postId?: boolean
    tagId?: boolean
    createdAt?: boolean
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTags"]>

  export type PostTagsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postId?: boolean
    tagId?: boolean
    createdAt?: boolean
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTags"]>

  export type PostTagsSelectScalar = {
    postId?: boolean
    tagId?: boolean
    createdAt?: boolean
  }

  export type PostTagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"postId" | "tagId" | "createdAt", ExtArgs["result"]["postTags"]>
  export type PostTagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }
  export type PostTagsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }
  export type PostTagsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostsDefaultArgs<ExtArgs>
    tag?: boolean | TagsDefaultArgs<ExtArgs>
  }

  export type $PostTagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostTags"
    objects: {
      post: Prisma.$PostsPayload<ExtArgs>
      tag: Prisma.$TagsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      postId: string
      tagId: number
      createdAt: Date
    }, ExtArgs["result"]["postTags"]>
    composites: {}
  }

  type PostTagsGetPayload<S extends boolean | null | undefined | PostTagsDefaultArgs> = $Result.GetResult<Prisma.$PostTagsPayload, S>

  type PostTagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostTagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PostTagsCountAggregateInputType | true
    }

  export interface PostTagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostTags'], meta: { name: 'PostTags' } }
    /**
     * Find zero or one PostTags that matches the filter.
     * @param {PostTagsFindUniqueArgs} args - Arguments to find a PostTags
     * @example
     * // Get one PostTags
     * const postTags = await prisma.postTags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostTagsFindUniqueArgs>(args: SelectSubset<T, PostTagsFindUniqueArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostTags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostTagsFindUniqueOrThrowArgs} args - Arguments to find a PostTags
     * @example
     * // Get one PostTags
     * const postTags = await prisma.postTags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostTagsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostTagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsFindFirstArgs} args - Arguments to find a PostTags
     * @example
     * // Get one PostTags
     * const postTags = await prisma.postTags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostTagsFindFirstArgs>(args?: SelectSubset<T, PostTagsFindFirstArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsFindFirstOrThrowArgs} args - Arguments to find a PostTags
     * @example
     * // Get one PostTags
     * const postTags = await prisma.postTags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostTagsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostTagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostTags
     * const postTags = await prisma.postTags.findMany()
     * 
     * // Get first 10 PostTags
     * const postTags = await prisma.postTags.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const postTagsWithPostIdOnly = await prisma.postTags.findMany({ select: { postId: true } })
     * 
     */
    findMany<T extends PostTagsFindManyArgs>(args?: SelectSubset<T, PostTagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostTags.
     * @param {PostTagsCreateArgs} args - Arguments to create a PostTags.
     * @example
     * // Create one PostTags
     * const PostTags = await prisma.postTags.create({
     *   data: {
     *     // ... data to create a PostTags
     *   }
     * })
     * 
     */
    create<T extends PostTagsCreateArgs>(args: SelectSubset<T, PostTagsCreateArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostTags.
     * @param {PostTagsCreateManyArgs} args - Arguments to create many PostTags.
     * @example
     * // Create many PostTags
     * const postTags = await prisma.postTags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostTagsCreateManyArgs>(args?: SelectSubset<T, PostTagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostTags and returns the data saved in the database.
     * @param {PostTagsCreateManyAndReturnArgs} args - Arguments to create many PostTags.
     * @example
     * // Create many PostTags
     * const postTags = await prisma.postTags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostTags and only return the `postId`
     * const postTagsWithPostIdOnly = await prisma.postTags.createManyAndReturn({
     *   select: { postId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostTagsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostTagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostTags.
     * @param {PostTagsDeleteArgs} args - Arguments to delete one PostTags.
     * @example
     * // Delete one PostTags
     * const PostTags = await prisma.postTags.delete({
     *   where: {
     *     // ... filter to delete one PostTags
     *   }
     * })
     * 
     */
    delete<T extends PostTagsDeleteArgs>(args: SelectSubset<T, PostTagsDeleteArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostTags.
     * @param {PostTagsUpdateArgs} args - Arguments to update one PostTags.
     * @example
     * // Update one PostTags
     * const postTags = await prisma.postTags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostTagsUpdateArgs>(args: SelectSubset<T, PostTagsUpdateArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostTags.
     * @param {PostTagsDeleteManyArgs} args - Arguments to filter PostTags to delete.
     * @example
     * // Delete a few PostTags
     * const { count } = await prisma.postTags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostTagsDeleteManyArgs>(args?: SelectSubset<T, PostTagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostTags
     * const postTags = await prisma.postTags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostTagsUpdateManyArgs>(args: SelectSubset<T, PostTagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTags and returns the data updated in the database.
     * @param {PostTagsUpdateManyAndReturnArgs} args - Arguments to update many PostTags.
     * @example
     * // Update many PostTags
     * const postTags = await prisma.postTags.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostTags and only return the `postId`
     * const postTagsWithPostIdOnly = await prisma.postTags.updateManyAndReturn({
     *   select: { postId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostTagsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostTagsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostTags.
     * @param {PostTagsUpsertArgs} args - Arguments to update or create a PostTags.
     * @example
     * // Update or create a PostTags
     * const postTags = await prisma.postTags.upsert({
     *   create: {
     *     // ... data to create a PostTags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostTags we want to update
     *   }
     * })
     */
    upsert<T extends PostTagsUpsertArgs>(args: SelectSubset<T, PostTagsUpsertArgs<ExtArgs>>): Prisma__PostTagsClient<$Result.GetResult<Prisma.$PostTagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsCountArgs} args - Arguments to filter PostTags to count.
     * @example
     * // Count the number of PostTags
     * const count = await prisma.postTags.count({
     *   where: {
     *     // ... the filter for the PostTags we want to count
     *   }
     * })
    **/
    count<T extends PostTagsCountArgs>(
      args?: Subset<T, PostTagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostTagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostTagsAggregateArgs>(args: Subset<T, PostTagsAggregateArgs>): Prisma.PrismaPromise<GetPostTagsAggregateType<T>>

    /**
     * Group by PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostTagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostTagsGroupByArgs['orderBy'] }
        : { orderBy?: PostTagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostTagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostTagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostTags model
   */
  readonly fields: PostTagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostTags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostTagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostsDefaultArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagsDefaultArgs<ExtArgs>>): Prisma__TagsClient<$Result.GetResult<Prisma.$TagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostTags model
   */
  interface PostTagsFieldRefs {
    readonly postId: FieldRef<"PostTags", 'String'>
    readonly tagId: FieldRef<"PostTags", 'Int'>
    readonly createdAt: FieldRef<"PostTags", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostTags findUnique
   */
  export type PostTagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where: PostTagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags findUniqueOrThrow
   */
  export type PostTagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where: PostTagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags findFirst
   */
  export type PostTagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where?: PostTagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagsScalarFieldEnum | PostTagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags findFirstOrThrow
   */
  export type PostTagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where?: PostTagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagsScalarFieldEnum | PostTagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags findMany
   */
  export type PostTagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where?: PostTagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagsOrderByWithRelationInput | PostTagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostTags.
     */
    cursor?: PostTagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    distinct?: PostTagsScalarFieldEnum | PostTagsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags create
   */
  export type PostTagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * The data needed to create a PostTags.
     */
    data: XOR<PostTagsCreateInput, PostTagsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags createMany
   */
  export type PostTagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostTags.
     */
    data: PostTagsCreateManyInput | PostTagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostTags createManyAndReturn
   */
  export type PostTagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * The data used to create many PostTags.
     */
    data: PostTagsCreateManyInput | PostTagsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostTags update
   */
  export type PostTagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * The data needed to update a PostTags.
     */
    data: XOR<PostTagsUpdateInput, PostTagsUncheckedUpdateInput>
    /**
     * Choose, which PostTags to update.
     */
    where: PostTagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags updateMany
   */
  export type PostTagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostTags.
     */
    data: XOR<PostTagsUpdateManyMutationInput, PostTagsUncheckedUpdateManyInput>
    /**
     * Filter which PostTags to update
     */
    where?: PostTagsWhereInput
    /**
     * Limit how many PostTags to update.
     */
    limit?: number
  }

  /**
   * PostTags updateManyAndReturn
   */
  export type PostTagsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * The data used to update PostTags.
     */
    data: XOR<PostTagsUpdateManyMutationInput, PostTagsUncheckedUpdateManyInput>
    /**
     * Filter which PostTags to update
     */
    where?: PostTagsWhereInput
    /**
     * Limit how many PostTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostTags upsert
   */
  export type PostTagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * The filter to search for the PostTags to update in case it exists.
     */
    where: PostTagsWhereUniqueInput
    /**
     * In case the PostTags found by the `where` argument doesn't exist, create a new PostTags with this data.
     */
    create: XOR<PostTagsCreateInput, PostTagsUncheckedCreateInput>
    /**
     * In case the PostTags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostTagsUpdateInput, PostTagsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags delete
   */
  export type PostTagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
    /**
     * Filter which PostTags to delete.
     */
    where: PostTagsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PostTags deleteMany
   */
  export type PostTagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTags to delete
     */
    where?: PostTagsWhereInput
    /**
     * Limit how many PostTags to delete.
     */
    limit?: number
  }

  /**
   * PostTags without action
   */
  export type PostTagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTags
     */
    select?: PostTagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTags
     */
    omit?: PostTagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BlogSourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    type: 'type',
    scrapingConfig: 'scrapingConfig',
    icon: 'icon',
    isActive: 'isActive',
    lastFetchedAt: 'lastFetchedAt',
    lastFetchStatus: 'lastFetchStatus',
    lastFetchError: 'lastFetchError',
    totalPostsFetched: 'totalPostsFetched',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogSourceScalarFieldEnum = (typeof BlogSourceScalarFieldEnum)[keyof typeof BlogSourceScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const PostsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    isDisplay: 'isDisplay',
    tags: 'tags',
    sourceId: 'sourceId',
    sourceUrl: 'sourceUrl',
    originalPublishedAt: 'originalPublishedAt',
    originalAuthor: 'originalAuthor',
    description: 'description',
    imageUrl: 'imageUrl',
    rawFeedData: 'rawFeedData',
    contentHash: 'contentHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostsScalarFieldEnum = (typeof PostsScalarFieldEnum)[keyof typeof PostsScalarFieldEnum]


  export const TagsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    count: 'count'
  };

  export type TagsScalarFieldEnum = (typeof TagsScalarFieldEnum)[keyof typeof TagsScalarFieldEnum]


  export const PostTagsScalarFieldEnum: {
    postId: 'postId',
    tagId: 'tagId',
    createdAt: 'createdAt'
  };

  export type PostTagsScalarFieldEnum = (typeof PostTagsScalarFieldEnum)[keyof typeof PostTagsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'FeedType'
   */
  export type EnumFeedTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedType'>
    


  /**
   * Reference to a field of type 'FeedType[]'
   */
  export type ListEnumFeedTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FetchStatus'
   */
  export type EnumFetchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FetchStatus'>
    


  /**
   * Reference to a field of type 'FetchStatus[]'
   */
  export type ListEnumFetchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FetchStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BlogSourceWhereInput = {
    AND?: BlogSourceWhereInput | BlogSourceWhereInput[]
    OR?: BlogSourceWhereInput[]
    NOT?: BlogSourceWhereInput | BlogSourceWhereInput[]
    id?: UuidFilter<"BlogSource"> | string
    name?: StringFilter<"BlogSource"> | string
    url?: StringFilter<"BlogSource"> | string
    type?: EnumFeedTypeFilter<"BlogSource"> | $Enums.FeedType
    scrapingConfig?: JsonNullableFilter<"BlogSource">
    icon?: StringNullableFilter<"BlogSource"> | string | null
    isActive?: BoolFilter<"BlogSource"> | boolean
    lastFetchedAt?: DateTimeNullableFilter<"BlogSource"> | Date | string | null
    lastFetchStatus?: EnumFetchStatusFilter<"BlogSource"> | $Enums.FetchStatus
    lastFetchError?: StringNullableFilter<"BlogSource"> | string | null
    totalPostsFetched?: IntFilter<"BlogSource"> | number
    createdAt?: DateTimeFilter<"BlogSource"> | Date | string
    updatedAt?: DateTimeFilter<"BlogSource"> | Date | string
    posts?: PostsListRelationFilter
  }

  export type BlogSourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    scrapingConfig?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastFetchedAt?: SortOrderInput | SortOrder
    lastFetchStatus?: SortOrder
    lastFetchError?: SortOrderInput | SortOrder
    totalPostsFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    posts?: PostsOrderByRelationAggregateInput
  }

  export type BlogSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: BlogSourceWhereInput | BlogSourceWhereInput[]
    OR?: BlogSourceWhereInput[]
    NOT?: BlogSourceWhereInput | BlogSourceWhereInput[]
    name?: StringFilter<"BlogSource"> | string
    type?: EnumFeedTypeFilter<"BlogSource"> | $Enums.FeedType
    scrapingConfig?: JsonNullableFilter<"BlogSource">
    icon?: StringNullableFilter<"BlogSource"> | string | null
    isActive?: BoolFilter<"BlogSource"> | boolean
    lastFetchedAt?: DateTimeNullableFilter<"BlogSource"> | Date | string | null
    lastFetchStatus?: EnumFetchStatusFilter<"BlogSource"> | $Enums.FetchStatus
    lastFetchError?: StringNullableFilter<"BlogSource"> | string | null
    totalPostsFetched?: IntFilter<"BlogSource"> | number
    createdAt?: DateTimeFilter<"BlogSource"> | Date | string
    updatedAt?: DateTimeFilter<"BlogSource"> | Date | string
    posts?: PostsListRelationFilter
  }, "id" | "url">

  export type BlogSourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    scrapingConfig?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastFetchedAt?: SortOrderInput | SortOrder
    lastFetchStatus?: SortOrder
    lastFetchError?: SortOrderInput | SortOrder
    totalPostsFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogSourceCountOrderByAggregateInput
    _avg?: BlogSourceAvgOrderByAggregateInput
    _max?: BlogSourceMaxOrderByAggregateInput
    _min?: BlogSourceMinOrderByAggregateInput
    _sum?: BlogSourceSumOrderByAggregateInput
  }

  export type BlogSourceScalarWhereWithAggregatesInput = {
    AND?: BlogSourceScalarWhereWithAggregatesInput | BlogSourceScalarWhereWithAggregatesInput[]
    OR?: BlogSourceScalarWhereWithAggregatesInput[]
    NOT?: BlogSourceScalarWhereWithAggregatesInput | BlogSourceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BlogSource"> | string
    name?: StringWithAggregatesFilter<"BlogSource"> | string
    url?: StringWithAggregatesFilter<"BlogSource"> | string
    type?: EnumFeedTypeWithAggregatesFilter<"BlogSource"> | $Enums.FeedType
    scrapingConfig?: JsonNullableWithAggregatesFilter<"BlogSource">
    icon?: StringNullableWithAggregatesFilter<"BlogSource"> | string | null
    isActive?: BoolWithAggregatesFilter<"BlogSource"> | boolean
    lastFetchedAt?: DateTimeNullableWithAggregatesFilter<"BlogSource"> | Date | string | null
    lastFetchStatus?: EnumFetchStatusWithAggregatesFilter<"BlogSource"> | $Enums.FetchStatus
    lastFetchError?: StringNullableWithAggregatesFilter<"BlogSource"> | string | null
    totalPostsFetched?: IntWithAggregatesFilter<"BlogSource"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BlogSource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogSource"> | Date | string
  }

  export type PostsWhereInput = {
    AND?: PostsWhereInput | PostsWhereInput[]
    OR?: PostsWhereInput[]
    NOT?: PostsWhereInput | PostsWhereInput[]
    id?: UuidFilter<"Posts"> | string
    title?: StringFilter<"Posts"> | string
    content?: StringFilter<"Posts"> | string
    isDisplay?: BoolFilter<"Posts"> | boolean
    tags?: StringNullableFilter<"Posts"> | string | null
    sourceId?: UuidNullableFilter<"Posts"> | string | null
    sourceUrl?: StringNullableFilter<"Posts"> | string | null
    originalPublishedAt?: DateTimeNullableFilter<"Posts"> | Date | string | null
    originalAuthor?: StringNullableFilter<"Posts"> | string | null
    description?: StringNullableFilter<"Posts"> | string | null
    imageUrl?: StringNullableFilter<"Posts"> | string | null
    rawFeedData?: JsonNullableFilter<"Posts">
    contentHash?: StringNullableFilter<"Posts"> | string | null
    createdAt?: DateTimeFilter<"Posts"> | Date | string
    updatedAt?: DateTimeFilter<"Posts"> | Date | string
    postTags?: PostTagsListRelationFilter
    source?: XOR<BlogSourceNullableScalarRelationFilter, BlogSourceWhereInput> | null
  }

  export type PostsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isDisplay?: SortOrder
    tags?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    originalPublishedAt?: SortOrderInput | SortOrder
    originalAuthor?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    rawFeedData?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postTags?: PostTagsOrderByRelationAggregateInput
    source?: BlogSourceOrderByWithRelationInput
  }

  export type PostsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sourceUrl?: string
    AND?: PostsWhereInput | PostsWhereInput[]
    OR?: PostsWhereInput[]
    NOT?: PostsWhereInput | PostsWhereInput[]
    title?: StringFilter<"Posts"> | string
    content?: StringFilter<"Posts"> | string
    isDisplay?: BoolFilter<"Posts"> | boolean
    tags?: StringNullableFilter<"Posts"> | string | null
    sourceId?: UuidNullableFilter<"Posts"> | string | null
    originalPublishedAt?: DateTimeNullableFilter<"Posts"> | Date | string | null
    originalAuthor?: StringNullableFilter<"Posts"> | string | null
    description?: StringNullableFilter<"Posts"> | string | null
    imageUrl?: StringNullableFilter<"Posts"> | string | null
    rawFeedData?: JsonNullableFilter<"Posts">
    contentHash?: StringNullableFilter<"Posts"> | string | null
    createdAt?: DateTimeFilter<"Posts"> | Date | string
    updatedAt?: DateTimeFilter<"Posts"> | Date | string
    postTags?: PostTagsListRelationFilter
    source?: XOR<BlogSourceNullableScalarRelationFilter, BlogSourceWhereInput> | null
  }, "id" | "sourceUrl">

  export type PostsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isDisplay?: SortOrder
    tags?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    originalPublishedAt?: SortOrderInput | SortOrder
    originalAuthor?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    rawFeedData?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostsCountOrderByAggregateInput
    _max?: PostsMaxOrderByAggregateInput
    _min?: PostsMinOrderByAggregateInput
  }

  export type PostsScalarWhereWithAggregatesInput = {
    AND?: PostsScalarWhereWithAggregatesInput | PostsScalarWhereWithAggregatesInput[]
    OR?: PostsScalarWhereWithAggregatesInput[]
    NOT?: PostsScalarWhereWithAggregatesInput | PostsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Posts"> | string
    title?: StringWithAggregatesFilter<"Posts"> | string
    content?: StringWithAggregatesFilter<"Posts"> | string
    isDisplay?: BoolWithAggregatesFilter<"Posts"> | boolean
    tags?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    sourceId?: UuidNullableWithAggregatesFilter<"Posts"> | string | null
    sourceUrl?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    originalPublishedAt?: DateTimeNullableWithAggregatesFilter<"Posts"> | Date | string | null
    originalAuthor?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    description?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    rawFeedData?: JsonNullableWithAggregatesFilter<"Posts">
    contentHash?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Posts"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Posts"> | Date | string
  }

  export type TagsWhereInput = {
    AND?: TagsWhereInput | TagsWhereInput[]
    OR?: TagsWhereInput[]
    NOT?: TagsWhereInput | TagsWhereInput[]
    id?: IntFilter<"Tags"> | number
    name?: StringFilter<"Tags"> | string
    count?: IntFilter<"Tags"> | number
    postTags?: PostTagsListRelationFilter
  }

  export type TagsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    count?: SortOrder
    postTags?: PostTagsOrderByRelationAggregateInput
  }

  export type TagsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TagsWhereInput | TagsWhereInput[]
    OR?: TagsWhereInput[]
    NOT?: TagsWhereInput | TagsWhereInput[]
    count?: IntFilter<"Tags"> | number
    postTags?: PostTagsListRelationFilter
  }, "id" | "name">

  export type TagsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    count?: SortOrder
    _count?: TagsCountOrderByAggregateInput
    _avg?: TagsAvgOrderByAggregateInput
    _max?: TagsMaxOrderByAggregateInput
    _min?: TagsMinOrderByAggregateInput
    _sum?: TagsSumOrderByAggregateInput
  }

  export type TagsScalarWhereWithAggregatesInput = {
    AND?: TagsScalarWhereWithAggregatesInput | TagsScalarWhereWithAggregatesInput[]
    OR?: TagsScalarWhereWithAggregatesInput[]
    NOT?: TagsScalarWhereWithAggregatesInput | TagsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tags"> | number
    name?: StringWithAggregatesFilter<"Tags"> | string
    count?: IntWithAggregatesFilter<"Tags"> | number
  }

  export type PostTagsWhereInput = {
    AND?: PostTagsWhereInput | PostTagsWhereInput[]
    OR?: PostTagsWhereInput[]
    NOT?: PostTagsWhereInput | PostTagsWhereInput[]
    postId?: UuidFilter<"PostTags"> | string
    tagId?: IntFilter<"PostTags"> | number
    createdAt?: DateTimeFilter<"PostTags"> | Date | string
    post?: XOR<PostsScalarRelationFilter, PostsWhereInput>
    tag?: XOR<TagsScalarRelationFilter, TagsWhereInput>
  }

  export type PostTagsOrderByWithRelationInput = {
    postId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    post?: PostsOrderByWithRelationInput
    tag?: TagsOrderByWithRelationInput
  }

  export type PostTagsWhereUniqueInput = Prisma.AtLeast<{
    postId_tagId?: PostTagsPostIdTagIdCompoundUniqueInput
    AND?: PostTagsWhereInput | PostTagsWhereInput[]
    OR?: PostTagsWhereInput[]
    NOT?: PostTagsWhereInput | PostTagsWhereInput[]
    postId?: UuidFilter<"PostTags"> | string
    tagId?: IntFilter<"PostTags"> | number
    createdAt?: DateTimeFilter<"PostTags"> | Date | string
    post?: XOR<PostsScalarRelationFilter, PostsWhereInput>
    tag?: XOR<TagsScalarRelationFilter, TagsWhereInput>
  }, "postId_tagId">

  export type PostTagsOrderByWithAggregationInput = {
    postId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    _count?: PostTagsCountOrderByAggregateInput
    _avg?: PostTagsAvgOrderByAggregateInput
    _max?: PostTagsMaxOrderByAggregateInput
    _min?: PostTagsMinOrderByAggregateInput
    _sum?: PostTagsSumOrderByAggregateInput
  }

  export type PostTagsScalarWhereWithAggregatesInput = {
    AND?: PostTagsScalarWhereWithAggregatesInput | PostTagsScalarWhereWithAggregatesInput[]
    OR?: PostTagsScalarWhereWithAggregatesInput[]
    NOT?: PostTagsScalarWhereWithAggregatesInput | PostTagsScalarWhereWithAggregatesInput[]
    postId?: UuidWithAggregatesFilter<"PostTags"> | string
    tagId?: IntWithAggregatesFilter<"PostTags"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PostTags"> | Date | string
  }

  export type BlogSourceCreateInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: string | null
    isActive?: boolean
    lastFetchedAt?: Date | string | null
    lastFetchStatus?: $Enums.FetchStatus
    lastFetchError?: string | null
    totalPostsFetched?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostsCreateNestedManyWithoutSourceInput
  }

  export type BlogSourceUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: string | null
    isActive?: boolean
    lastFetchedAt?: Date | string | null
    lastFetchStatus?: $Enums.FetchStatus
    lastFetchError?: string | null
    totalPostsFetched?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostsUncheckedCreateNestedManyWithoutSourceInput
  }

  export type BlogSourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostsUpdateManyWithoutSourceNestedInput
  }

  export type BlogSourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostsUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type BlogSourceCreateManyInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: string | null
    isActive?: boolean
    lastFetchedAt?: Date | string | null
    lastFetchStatus?: $Enums.FetchStatus
    lastFetchError?: string | null
    totalPostsFetched?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogSourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogSourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostsCreateInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postTags?: PostTagsCreateNestedManyWithoutPostInput
    source?: BlogSourceCreateNestedOneWithoutPostsInput
  }

  export type PostsUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceId?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postTags?: PostTagsUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postTags?: PostTagsUpdateManyWithoutPostNestedInput
    source?: BlogSourceUpdateOneWithoutPostsNestedInput
  }

  export type PostsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postTags?: PostTagsUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostsCreateManyInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceId?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagsCreateInput = {
    name: string
    count: number
    postTags?: PostTagsCreateNestedManyWithoutTagInput
  }

  export type TagsUncheckedCreateInput = {
    id?: number
    name: string
    count: number
    postTags?: PostTagsUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    postTags?: PostTagsUpdateManyWithoutTagNestedInput
  }

  export type TagsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    postTags?: PostTagsUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagsCreateManyInput = {
    id?: number
    name: string
    count: number
  }

  export type TagsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type TagsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type PostTagsCreateInput = {
    createdAt?: Date | string
    post: PostsCreateNestedOneWithoutPostTagsInput
    tag: TagsCreateNestedOneWithoutPostTagsInput
  }

  export type PostTagsUncheckedCreateInput = {
    postId: string
    tagId: number
    createdAt?: Date | string
  }

  export type PostTagsUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostsUpdateOneRequiredWithoutPostTagsNestedInput
    tag?: TagsUpdateOneRequiredWithoutPostTagsNestedInput
  }

  export type PostTagsUncheckedUpdateInput = {
    postId?: StringFieldUpdateOperationsInput | string
    tagId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsCreateManyInput = {
    postId: string
    tagId: number
    createdAt?: Date | string
  }

  export type PostTagsUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsUncheckedUpdateManyInput = {
    postId?: StringFieldUpdateOperationsInput | string
    tagId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumFeedTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedType | EnumFeedTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedTypeFilter<$PrismaModel> | $Enums.FeedType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumFetchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FetchStatus | EnumFetchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFetchStatusFilter<$PrismaModel> | $Enums.FetchStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostsListRelationFilter = {
    every?: PostsWhereInput
    some?: PostsWhereInput
    none?: PostsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogSourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    scrapingConfig?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    lastFetchedAt?: SortOrder
    lastFetchStatus?: SortOrder
    lastFetchError?: SortOrder
    totalPostsFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogSourceAvgOrderByAggregateInput = {
    totalPostsFetched?: SortOrder
  }

  export type BlogSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    lastFetchedAt?: SortOrder
    lastFetchStatus?: SortOrder
    lastFetchError?: SortOrder
    totalPostsFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogSourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    isActive?: SortOrder
    lastFetchedAt?: SortOrder
    lastFetchStatus?: SortOrder
    lastFetchError?: SortOrder
    totalPostsFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogSourceSumOrderByAggregateInput = {
    totalPostsFetched?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumFeedTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedType | EnumFeedTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeedType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedTypeFilter<$PrismaModel>
    _max?: NestedEnumFeedTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumFetchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FetchStatus | EnumFetchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFetchStatusWithAggregatesFilter<$PrismaModel> | $Enums.FetchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFetchStatusFilter<$PrismaModel>
    _max?: NestedEnumFetchStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type PostTagsListRelationFilter = {
    every?: PostTagsWhereInput
    some?: PostTagsWhereInput
    none?: PostTagsWhereInput
  }

  export type BlogSourceNullableScalarRelationFilter = {
    is?: BlogSourceWhereInput | null
    isNot?: BlogSourceWhereInput | null
  }

  export type PostTagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isDisplay?: SortOrder
    tags?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    originalPublishedAt?: SortOrder
    originalAuthor?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    rawFeedData?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isDisplay?: SortOrder
    tags?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    originalPublishedAt?: SortOrder
    originalAuthor?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    isDisplay?: SortOrder
    tags?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    originalPublishedAt?: SortOrder
    originalAuthor?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TagsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count?: SortOrder
  }

  export type TagsAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type TagsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count?: SortOrder
  }

  export type TagsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count?: SortOrder
  }

  export type TagsSumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type PostsScalarRelationFilter = {
    is?: PostsWhereInput
    isNot?: PostsWhereInput
  }

  export type TagsScalarRelationFilter = {
    is?: TagsWhereInput
    isNot?: TagsWhereInput
  }

  export type PostTagsPostIdTagIdCompoundUniqueInput = {
    postId: string
    tagId: number
  }

  export type PostTagsCountOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type PostTagsAvgOrderByAggregateInput = {
    tagId?: SortOrder
  }

  export type PostTagsMaxOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type PostTagsMinOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type PostTagsSumOrderByAggregateInput = {
    tagId?: SortOrder
  }

  export type PostsCreateNestedManyWithoutSourceInput = {
    create?: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput> | PostsCreateWithoutSourceInput[] | PostsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutSourceInput | PostsCreateOrConnectWithoutSourceInput[]
    createMany?: PostsCreateManySourceInputEnvelope
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
  }

  export type PostsUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput> | PostsCreateWithoutSourceInput[] | PostsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutSourceInput | PostsCreateOrConnectWithoutSourceInput[]
    createMany?: PostsCreateManySourceInputEnvelope
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumFeedTypeFieldUpdateOperationsInput = {
    set?: $Enums.FeedType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumFetchStatusFieldUpdateOperationsInput = {
    set?: $Enums.FetchStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostsUpdateManyWithoutSourceNestedInput = {
    create?: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput> | PostsCreateWithoutSourceInput[] | PostsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutSourceInput | PostsCreateOrConnectWithoutSourceInput[]
    upsert?: PostsUpsertWithWhereUniqueWithoutSourceInput | PostsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: PostsCreateManySourceInputEnvelope
    set?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    disconnect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    delete?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    update?: PostsUpdateWithWhereUniqueWithoutSourceInput | PostsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: PostsUpdateManyWithWhereWithoutSourceInput | PostsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: PostsScalarWhereInput | PostsScalarWhereInput[]
  }

  export type PostsUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput> | PostsCreateWithoutSourceInput[] | PostsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutSourceInput | PostsCreateOrConnectWithoutSourceInput[]
    upsert?: PostsUpsertWithWhereUniqueWithoutSourceInput | PostsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: PostsCreateManySourceInputEnvelope
    set?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    disconnect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    delete?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    update?: PostsUpdateWithWhereUniqueWithoutSourceInput | PostsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: PostsUpdateManyWithWhereWithoutSourceInput | PostsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: PostsScalarWhereInput | PostsScalarWhereInput[]
  }

  export type PostTagsCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput> | PostTagsCreateWithoutPostInput[] | PostTagsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutPostInput | PostTagsCreateOrConnectWithoutPostInput[]
    createMany?: PostTagsCreateManyPostInputEnvelope
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
  }

  export type BlogSourceCreateNestedOneWithoutPostsInput = {
    create?: XOR<BlogSourceCreateWithoutPostsInput, BlogSourceUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogSourceCreateOrConnectWithoutPostsInput
    connect?: BlogSourceWhereUniqueInput
  }

  export type PostTagsUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput> | PostTagsCreateWithoutPostInput[] | PostTagsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutPostInput | PostTagsCreateOrConnectWithoutPostInput[]
    createMany?: PostTagsCreateManyPostInputEnvelope
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
  }

  export type PostTagsUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput> | PostTagsCreateWithoutPostInput[] | PostTagsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutPostInput | PostTagsCreateOrConnectWithoutPostInput[]
    upsert?: PostTagsUpsertWithWhereUniqueWithoutPostInput | PostTagsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTagsCreateManyPostInputEnvelope
    set?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    disconnect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    delete?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    update?: PostTagsUpdateWithWhereUniqueWithoutPostInput | PostTagsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTagsUpdateManyWithWhereWithoutPostInput | PostTagsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
  }

  export type BlogSourceUpdateOneWithoutPostsNestedInput = {
    create?: XOR<BlogSourceCreateWithoutPostsInput, BlogSourceUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogSourceCreateOrConnectWithoutPostsInput
    upsert?: BlogSourceUpsertWithoutPostsInput
    disconnect?: BlogSourceWhereInput | boolean
    delete?: BlogSourceWhereInput | boolean
    connect?: BlogSourceWhereUniqueInput
    update?: XOR<XOR<BlogSourceUpdateToOneWithWhereWithoutPostsInput, BlogSourceUpdateWithoutPostsInput>, BlogSourceUncheckedUpdateWithoutPostsInput>
  }

  export type PostTagsUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput> | PostTagsCreateWithoutPostInput[] | PostTagsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutPostInput | PostTagsCreateOrConnectWithoutPostInput[]
    upsert?: PostTagsUpsertWithWhereUniqueWithoutPostInput | PostTagsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTagsCreateManyPostInputEnvelope
    set?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    disconnect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    delete?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    update?: PostTagsUpdateWithWhereUniqueWithoutPostInput | PostTagsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTagsUpdateManyWithWhereWithoutPostInput | PostTagsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
  }

  export type PostTagsCreateNestedManyWithoutTagInput = {
    create?: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput> | PostTagsCreateWithoutTagInput[] | PostTagsUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutTagInput | PostTagsCreateOrConnectWithoutTagInput[]
    createMany?: PostTagsCreateManyTagInputEnvelope
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
  }

  export type PostTagsUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput> | PostTagsCreateWithoutTagInput[] | PostTagsUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutTagInput | PostTagsCreateOrConnectWithoutTagInput[]
    createMany?: PostTagsCreateManyTagInputEnvelope
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
  }

  export type PostTagsUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput> | PostTagsCreateWithoutTagInput[] | PostTagsUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutTagInput | PostTagsCreateOrConnectWithoutTagInput[]
    upsert?: PostTagsUpsertWithWhereUniqueWithoutTagInput | PostTagsUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostTagsCreateManyTagInputEnvelope
    set?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    disconnect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    delete?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    update?: PostTagsUpdateWithWhereUniqueWithoutTagInput | PostTagsUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostTagsUpdateManyWithWhereWithoutTagInput | PostTagsUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
  }

  export type PostTagsUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput> | PostTagsCreateWithoutTagInput[] | PostTagsUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagsCreateOrConnectWithoutTagInput | PostTagsCreateOrConnectWithoutTagInput[]
    upsert?: PostTagsUpsertWithWhereUniqueWithoutTagInput | PostTagsUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostTagsCreateManyTagInputEnvelope
    set?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    disconnect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    delete?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    connect?: PostTagsWhereUniqueInput | PostTagsWhereUniqueInput[]
    update?: PostTagsUpdateWithWhereUniqueWithoutTagInput | PostTagsUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostTagsUpdateManyWithWhereWithoutTagInput | PostTagsUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
  }

  export type PostsCreateNestedOneWithoutPostTagsInput = {
    create?: XOR<PostsCreateWithoutPostTagsInput, PostsUncheckedCreateWithoutPostTagsInput>
    connectOrCreate?: PostsCreateOrConnectWithoutPostTagsInput
    connect?: PostsWhereUniqueInput
  }

  export type TagsCreateNestedOneWithoutPostTagsInput = {
    create?: XOR<TagsCreateWithoutPostTagsInput, TagsUncheckedCreateWithoutPostTagsInput>
    connectOrCreate?: TagsCreateOrConnectWithoutPostTagsInput
    connect?: TagsWhereUniqueInput
  }

  export type PostsUpdateOneRequiredWithoutPostTagsNestedInput = {
    create?: XOR<PostsCreateWithoutPostTagsInput, PostsUncheckedCreateWithoutPostTagsInput>
    connectOrCreate?: PostsCreateOrConnectWithoutPostTagsInput
    upsert?: PostsUpsertWithoutPostTagsInput
    connect?: PostsWhereUniqueInput
    update?: XOR<XOR<PostsUpdateToOneWithWhereWithoutPostTagsInput, PostsUpdateWithoutPostTagsInput>, PostsUncheckedUpdateWithoutPostTagsInput>
  }

  export type TagsUpdateOneRequiredWithoutPostTagsNestedInput = {
    create?: XOR<TagsCreateWithoutPostTagsInput, TagsUncheckedCreateWithoutPostTagsInput>
    connectOrCreate?: TagsCreateOrConnectWithoutPostTagsInput
    upsert?: TagsUpsertWithoutPostTagsInput
    connect?: TagsWhereUniqueInput
    update?: XOR<XOR<TagsUpdateToOneWithWhereWithoutPostTagsInput, TagsUpdateWithoutPostTagsInput>, TagsUncheckedUpdateWithoutPostTagsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumFeedTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedType | EnumFeedTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedTypeFilter<$PrismaModel> | $Enums.FeedType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumFetchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FetchStatus | EnumFetchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFetchStatusFilter<$PrismaModel> | $Enums.FetchStatus
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumFeedTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedType | EnumFeedTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedType[] | ListEnumFeedTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeedType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedTypeFilter<$PrismaModel>
    _max?: NestedEnumFeedTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumFetchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FetchStatus | EnumFetchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FetchStatus[] | ListEnumFetchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFetchStatusWithAggregatesFilter<$PrismaModel> | $Enums.FetchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFetchStatusFilter<$PrismaModel>
    _max?: NestedEnumFetchStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PostsCreateWithoutSourceInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postTags?: PostTagsCreateNestedManyWithoutPostInput
  }

  export type PostsUncheckedCreateWithoutSourceInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postTags?: PostTagsUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostsCreateOrConnectWithoutSourceInput = {
    where: PostsWhereUniqueInput
    create: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput>
  }

  export type PostsCreateManySourceInputEnvelope = {
    data: PostsCreateManySourceInput | PostsCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type PostsUpsertWithWhereUniqueWithoutSourceInput = {
    where: PostsWhereUniqueInput
    update: XOR<PostsUpdateWithoutSourceInput, PostsUncheckedUpdateWithoutSourceInput>
    create: XOR<PostsCreateWithoutSourceInput, PostsUncheckedCreateWithoutSourceInput>
  }

  export type PostsUpdateWithWhereUniqueWithoutSourceInput = {
    where: PostsWhereUniqueInput
    data: XOR<PostsUpdateWithoutSourceInput, PostsUncheckedUpdateWithoutSourceInput>
  }

  export type PostsUpdateManyWithWhereWithoutSourceInput = {
    where: PostsScalarWhereInput
    data: XOR<PostsUpdateManyMutationInput, PostsUncheckedUpdateManyWithoutSourceInput>
  }

  export type PostsScalarWhereInput = {
    AND?: PostsScalarWhereInput | PostsScalarWhereInput[]
    OR?: PostsScalarWhereInput[]
    NOT?: PostsScalarWhereInput | PostsScalarWhereInput[]
    id?: UuidFilter<"Posts"> | string
    title?: StringFilter<"Posts"> | string
    content?: StringFilter<"Posts"> | string
    isDisplay?: BoolFilter<"Posts"> | boolean
    tags?: StringNullableFilter<"Posts"> | string | null
    sourceId?: UuidNullableFilter<"Posts"> | string | null
    sourceUrl?: StringNullableFilter<"Posts"> | string | null
    originalPublishedAt?: DateTimeNullableFilter<"Posts"> | Date | string | null
    originalAuthor?: StringNullableFilter<"Posts"> | string | null
    description?: StringNullableFilter<"Posts"> | string | null
    imageUrl?: StringNullableFilter<"Posts"> | string | null
    rawFeedData?: JsonNullableFilter<"Posts">
    contentHash?: StringNullableFilter<"Posts"> | string | null
    createdAt?: DateTimeFilter<"Posts"> | Date | string
    updatedAt?: DateTimeFilter<"Posts"> | Date | string
  }

  export type PostTagsCreateWithoutPostInput = {
    createdAt?: Date | string
    tag: TagsCreateNestedOneWithoutPostTagsInput
  }

  export type PostTagsUncheckedCreateWithoutPostInput = {
    tagId: number
    createdAt?: Date | string
  }

  export type PostTagsCreateOrConnectWithoutPostInput = {
    where: PostTagsWhereUniqueInput
    create: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput>
  }

  export type PostTagsCreateManyPostInputEnvelope = {
    data: PostTagsCreateManyPostInput | PostTagsCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type BlogSourceCreateWithoutPostsInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: string | null
    isActive?: boolean
    lastFetchedAt?: Date | string | null
    lastFetchStatus?: $Enums.FetchStatus
    lastFetchError?: string | null
    totalPostsFetched?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogSourceUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: string | null
    isActive?: boolean
    lastFetchedAt?: Date | string | null
    lastFetchStatus?: $Enums.FetchStatus
    lastFetchError?: string | null
    totalPostsFetched?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogSourceCreateOrConnectWithoutPostsInput = {
    where: BlogSourceWhereUniqueInput
    create: XOR<BlogSourceCreateWithoutPostsInput, BlogSourceUncheckedCreateWithoutPostsInput>
  }

  export type PostTagsUpsertWithWhereUniqueWithoutPostInput = {
    where: PostTagsWhereUniqueInput
    update: XOR<PostTagsUpdateWithoutPostInput, PostTagsUncheckedUpdateWithoutPostInput>
    create: XOR<PostTagsCreateWithoutPostInput, PostTagsUncheckedCreateWithoutPostInput>
  }

  export type PostTagsUpdateWithWhereUniqueWithoutPostInput = {
    where: PostTagsWhereUniqueInput
    data: XOR<PostTagsUpdateWithoutPostInput, PostTagsUncheckedUpdateWithoutPostInput>
  }

  export type PostTagsUpdateManyWithWhereWithoutPostInput = {
    where: PostTagsScalarWhereInput
    data: XOR<PostTagsUpdateManyMutationInput, PostTagsUncheckedUpdateManyWithoutPostInput>
  }

  export type PostTagsScalarWhereInput = {
    AND?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
    OR?: PostTagsScalarWhereInput[]
    NOT?: PostTagsScalarWhereInput | PostTagsScalarWhereInput[]
    postId?: UuidFilter<"PostTags"> | string
    tagId?: IntFilter<"PostTags"> | number
    createdAt?: DateTimeFilter<"PostTags"> | Date | string
  }

  export type BlogSourceUpsertWithoutPostsInput = {
    update: XOR<BlogSourceUpdateWithoutPostsInput, BlogSourceUncheckedUpdateWithoutPostsInput>
    create: XOR<BlogSourceCreateWithoutPostsInput, BlogSourceUncheckedCreateWithoutPostsInput>
    where?: BlogSourceWhereInput
  }

  export type BlogSourceUpdateToOneWithWhereWithoutPostsInput = {
    where?: BlogSourceWhereInput
    data: XOR<BlogSourceUpdateWithoutPostsInput, BlogSourceUncheckedUpdateWithoutPostsInput>
  }

  export type BlogSourceUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogSourceUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumFeedTypeFieldUpdateOperationsInput | $Enums.FeedType
    scrapingConfig?: NullableJsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastFetchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFetchStatus?: EnumFetchStatusFieldUpdateOperationsInput | $Enums.FetchStatus
    lastFetchError?: NullableStringFieldUpdateOperationsInput | string | null
    totalPostsFetched?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsCreateWithoutTagInput = {
    createdAt?: Date | string
    post: PostsCreateNestedOneWithoutPostTagsInput
  }

  export type PostTagsUncheckedCreateWithoutTagInput = {
    postId: string
    createdAt?: Date | string
  }

  export type PostTagsCreateOrConnectWithoutTagInput = {
    where: PostTagsWhereUniqueInput
    create: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput>
  }

  export type PostTagsCreateManyTagInputEnvelope = {
    data: PostTagsCreateManyTagInput | PostTagsCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type PostTagsUpsertWithWhereUniqueWithoutTagInput = {
    where: PostTagsWhereUniqueInput
    update: XOR<PostTagsUpdateWithoutTagInput, PostTagsUncheckedUpdateWithoutTagInput>
    create: XOR<PostTagsCreateWithoutTagInput, PostTagsUncheckedCreateWithoutTagInput>
  }

  export type PostTagsUpdateWithWhereUniqueWithoutTagInput = {
    where: PostTagsWhereUniqueInput
    data: XOR<PostTagsUpdateWithoutTagInput, PostTagsUncheckedUpdateWithoutTagInput>
  }

  export type PostTagsUpdateManyWithWhereWithoutTagInput = {
    where: PostTagsScalarWhereInput
    data: XOR<PostTagsUpdateManyMutationInput, PostTagsUncheckedUpdateManyWithoutTagInput>
  }

  export type PostsCreateWithoutPostTagsInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: BlogSourceCreateNestedOneWithoutPostsInput
  }

  export type PostsUncheckedCreateWithoutPostTagsInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceId?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostsCreateOrConnectWithoutPostTagsInput = {
    where: PostsWhereUniqueInput
    create: XOR<PostsCreateWithoutPostTagsInput, PostsUncheckedCreateWithoutPostTagsInput>
  }

  export type TagsCreateWithoutPostTagsInput = {
    name: string
    count: number
  }

  export type TagsUncheckedCreateWithoutPostTagsInput = {
    id?: number
    name: string
    count: number
  }

  export type TagsCreateOrConnectWithoutPostTagsInput = {
    where: TagsWhereUniqueInput
    create: XOR<TagsCreateWithoutPostTagsInput, TagsUncheckedCreateWithoutPostTagsInput>
  }

  export type PostsUpsertWithoutPostTagsInput = {
    update: XOR<PostsUpdateWithoutPostTagsInput, PostsUncheckedUpdateWithoutPostTagsInput>
    create: XOR<PostsCreateWithoutPostTagsInput, PostsUncheckedCreateWithoutPostTagsInput>
    where?: PostsWhereInput
  }

  export type PostsUpdateToOneWithWhereWithoutPostTagsInput = {
    where?: PostsWhereInput
    data: XOR<PostsUpdateWithoutPostTagsInput, PostsUncheckedUpdateWithoutPostTagsInput>
  }

  export type PostsUpdateWithoutPostTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: BlogSourceUpdateOneWithoutPostsNestedInput
  }

  export type PostsUncheckedUpdateWithoutPostTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagsUpsertWithoutPostTagsInput = {
    update: XOR<TagsUpdateWithoutPostTagsInput, TagsUncheckedUpdateWithoutPostTagsInput>
    create: XOR<TagsCreateWithoutPostTagsInput, TagsUncheckedCreateWithoutPostTagsInput>
    where?: TagsWhereInput
  }

  export type TagsUpdateToOneWithWhereWithoutPostTagsInput = {
    where?: TagsWhereInput
    data: XOR<TagsUpdateWithoutPostTagsInput, TagsUncheckedUpdateWithoutPostTagsInput>
  }

  export type TagsUpdateWithoutPostTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type TagsUncheckedUpdateWithoutPostTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type PostsCreateManySourceInput = {
    id?: string
    title: string
    content: string
    isDisplay?: boolean
    tags?: string | null
    sourceUrl?: string | null
    originalPublishedAt?: Date | string | null
    originalAuthor?: string | null
    description?: string | null
    imageUrl?: string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostsUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postTags?: PostTagsUpdateManyWithoutPostNestedInput
  }

  export type PostsUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postTags?: PostTagsUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostsUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isDisplay?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalPublishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalAuthor?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    rawFeedData?: NullableJsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsCreateManyPostInput = {
    tagId: number
    createdAt?: Date | string
  }

  export type PostTagsUpdateWithoutPostInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: TagsUpdateOneRequiredWithoutPostTagsNestedInput
  }

  export type PostTagsUncheckedUpdateWithoutPostInput = {
    tagId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsUncheckedUpdateManyWithoutPostInput = {
    tagId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsCreateManyTagInput = {
    postId: string
    createdAt?: Date | string
  }

  export type PostTagsUpdateWithoutTagInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostsUpdateOneRequiredWithoutPostTagsNestedInput
  }

  export type PostTagsUncheckedUpdateWithoutTagInput = {
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTagsUncheckedUpdateManyWithoutTagInput = {
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}