# TAO Trigrams

The first step in creating the specification for our TAO App is to list the possible Trigrams by
defining the Terms, Actions and Orientations from our Application Domain allows us to easily
provide specs that translate directly to code.

These are then used to define the [Protocols](PROTOCOLS.md) our App will allow and lead us to
implementation details in our [Paths](PATHS.md) definitions.

## Terms

* `app` - represents the application itself
* `user` - represents a `User` of the `App` when they interact with the `App`
* `auth` - represents the authenticated `User`'s identity and authorization
* `profile` - represents other `User`s of the `App` to a given `User`
* `article` - content created by `User`s of the `App`
* `tag` - a way to group `Article`s around a common theme
* `comment` - comment on an `Article` by a `User`

## Actions

Actions are derived from the User Spatial Epoch Model (U.S.E.R.) which provides a standard set of actions
from the perspective of interacting with objects in time and space

* `new` - starts off a new term letting the `App` react to how the `User` should create the term
* `add` - add a new term to the `App`
* `create` - create the new term in the `App`'s permanent storage
* `edit` - starts off the editing of an existing term
* `update` - update the term in the `App`
* `save`, `store` - store the changes to the `App`'s permanent storage
* `find` - search for existing items of a given term
* `fetch` - pull existing items from the `App`'s permanent storage
* `list` - a provide the `App` with a list of items of a given term
* `browse` - allow the `User` to browse a list of items of a given term
* `select` - an specific item of a term has been selected
* `locate` - locate an individual item of a term in the `App`
* `retrieve` - retrieve an individual item of a term from the `App`'s permanent storage
* `obtain`?
* `load`?
* `enter` - enter an item of a term in order to interact with it
* `view` - view the item of a term
* `copy` - copy the item of a term as a new item
* `leave` - leave an item of a term to stop interacting with it
* `delete` - signal to delete a specific item of a term
* `remove` - remove the specific item of the term from the `App`'s permanent storage

### Common Action Chains

|---|
|Creating|
|`new` => `add` => `create` => `load` => `enter` => `view`|
|Creating Error|
|`new` => `add` => `fail`|
|`new` => `add` => `create` => `fail`|
|Editing|
|`edit` => `update` => `save` => `load` => `enter` => `view`|
|Editing Error|
|`edit` => `update` => `fail`|
|`edit` => `update` => `save` => `fail`|
|Removing|
|`delete` => `remove` => `unload` => `leave`|
|Removing Error|
|`delete` => `remove` => `fail`|
|Selecting & Viewing|
|`select` => `locate` => `retrieve` => `load` => `enter` => `view`|
|Missing resource|
|`select` => `locate` => `missing`|
|Listing|
|`find` => `fetch` => `list` => `browse`|
|Listing Error|
|`find` => `fetch` => `fail`|
|Enter & Exit|
|`enter` => `leave`|

## Orientations

* `anon` - for Anonymous contexts
* `portal` - for logged in contexts
