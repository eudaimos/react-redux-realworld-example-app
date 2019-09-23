# TAO Paths

Paths define how the App we are specifying will implement [defined Protocols](PROTOCOLS.md).

Lists of possible Trigrams are [defined here](TRIGRAMS.md).

## Visit Site

|#|trigger|Term|Action|Orient||handler spec|
|---|---|----|------|------|---|-----------|
|0.|User requests Site|`app`|`init`|`anon`|`=>?!`[^a]|is anonymoust `user`?<br/>!initialize portal orientation|
|1.||`app`|`load`|`anon`||translate incoming url to next App Con|
|2.|<a id="fn_a">a:</a>Returning User|`app`|`init`|`portal`|

## Go to Home Page as Anonymous User

|#|trigger|Term|Action|Orient||handler spec|
|---|---|----|------|------|---|-----------|
|0.|User navigates to Home|`home`|`enter`|`*`|`=>`|set the URL to `/`|
|1.||`home`|`enter`|`anon`|`=>/`|find the most recent articles|
|2.||`home`|`enter`|`*`|`=>/`|find the 20 most popular `tag`s|
|3.||`home`|`enter`|`anon`|`=>`|go to the home page|
|4.||`home`|`view`|`*`|`=>`|display the home page component|

## Go to Home Page as Logged In User

|#|trigger|Term|Action|Orient||handler spec|
|---|---|----|------|------|---|-----------|
|0.|User navigates to Home|`home`|`enter`|`*`|`=>`|set the URL to `/`|
|1.||`home`|`enter`|`portal`|`=>/`|find the user's feed of articles|
|2.||`home`|`enter`|`*`|`=>/`|find the 20 most popular `tag`s|
|3.||`home`|`enter`|`*`|`=>`|go to the home page|
|4.||`home`|`view`|`*`|`=>`|display the home page component|

## Sign Up

|#|trigger|Term|Action|Orient||handler spec|
|---|---|----|------|------|---|-----------|
|0.|User navigates to Register|`user`|`new`|`anon`|`=>`|set the URL to `/register`|
|1.||`user`|`new`|`anon`|`=>`|show Register form|
|2.|User submits registration form|`user`|`add`|`anon`|`=>/`|find the 20 most popular `tag`s|
|3.||`home`|`enter`|`*`|`=>`|go to the home page|
|4.||`home`|`view`|`*`|`=>`|display the home page component|

## Login

## Logout

## Edit Profile

## Create Article

## Edit Article

## Visit Article

## Comment on Article

## Delete Article Comment

## Favorite Article

## Unfavorite Article

### Example


|#|trigger|Term|Action|Orient||handler spec|
|---|---|----|------|------|---|-----------|
|0|User requests Site|`app`|`init`|`anon`|`=>?!`[^a]|is returning `user``?`<br/>`!`initialize portal orientation|
|1||`app`|`load`|`anon`|`=>`|get the `Space` Edit form and put it in the UI|
|2|<a id="fn_a">b:</a>User unauthorized|`Space`|`Enter`|`Portal`<td colspan="2">go back to the <a href="#use-case-user-views-space">User Views Space</a> TAO-Path</td>
|3|User hits cancel|`Space`|`Enter`|`Portal`<td colspan="2">go back to the <a href="#use-case-user-views-space">User Views Space</a> TAO-Path</td>
|4|User hits save|`Space`|`Update`|`Portal`|`=>?!`[^c]|is updated `Space` data valid`?`<br/>`!`validation errors|
|5||`Space`|`Update`|`Portal`|`=>?!`[^b]|can User edit `Space` `?`<br/>`!`User unauthorized|
|6||`Space`|`Update`|`Portal`|`=>`|send the updated `Space` data to the api|
|7|`\`<a id="fn_b">c:</a>`=>`|`Space`|`Fail`|`Portal`|`=>`|render errors in Edit form|
|8|`=>`|`Space`|`Store`|`Admin`|`=>`|store the updated `Space`'s data in primary data store for later retrieval in the `Admin`|
|9|`=>`|`Space`|`Store`|`Portal`|`=>`|store the updated `Space`'s data in cache for later retrieval in the `Portal`|
|10|`=>`|`Space`|`Enter`|`Portal`<td colspan="2">go back to the <a href="#use-case-user-views-space">User Views Space</a> TAO-Path</td>
