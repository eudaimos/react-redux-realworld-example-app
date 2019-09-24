# TAO Protocols

Protocols specify a series of Appliction Contexts that are possible within the App we are specifying.

Protocols are taken from the [possible Trigrams](TRIGRAMS.md) we specified from our Domain.

More details for how these will be/are implemented are found in the [Path definitions](PATHS.md).

## Visit Site

|#|flow|Term|Action|Orient||destination|
|---|---|----|------|------|---|-----------|
|0.|User requests Site|`app`|`init`|`anon`|`=>?!`<sup>[a](#fn_a)</sup>|is anonymous `user`?<br/>!initialize portal orientation|
|1.|`=\`<a name="fn_a">a:</a>`>`|`app`|`init`|`portal`||[Returning User](#returning-user)|
|1.|`===>`|`app`|`load`|`anon`|||
|2.|`===>`|`app`|`enter`|`anon`||translate incoming url to next App Con|

## Returning User

|#|flow|Term|Action|Orient|description|
|---|---|----|------|------|-----------|
|0.||`app`|`init`|`portal`||
|1.|`=>`|`user`|`locate`|`portal`||
|2.|user found by token|`user`|`retrieve`|`portal`||
|3.|`\=>`|`user`|`load`|`portal`||
|4.|`==>`|`user`|`enter`|`portal`||
|3.|`=>`|`app`|`load`|`portal`||
|4.|`=>`|`app`|`enter`|`portal`|translate incoming url to next App Con|

## Returning User Expired Token

|#|flow|Term|Action|Orient|description|
|---|---|----|------|------|-----------|
|0.||`app`|`init`|`portal`||
|1.|`=>`|`user`|`locate`|`portal`||
|2.|user not found by token|`user`|`missing`|`portal`||
|3.|`=>`|`app`|`load`|`anon`||
|4.|`=>`|`app`|`enter`|`anon`||

## Go to Home Page as Anonymous User

|#|flow|Term|Action|Orient|description|
|---|---|----|------|------|-----------|
|0.|User navigates to Home|`home`|`load`|`anon`||
|1.|`\=>`|`article`|`find`|`anon`|[Display Recent Articles](#display-recent-articles)|
|1.|`\=>`|`tag`|`find`|`anon`|[Display Popular Tags](#display-popular-tags)|
|1.|`=>`|`home`|`enter`|`anon`||
|2.|`=>`|`home`|`view`|`anon`||

## Go to Home Page as Logged In User

|#|flow|Term|Action|Orient|description|
|---|---|----|------|------|-----------|
|0.|User navigates to Home|`home`|`load`|`portal`||
|1.|`\=>`|`article`|`find`|`anon`|[Display User Article Feed](#display-user-article-feed)|
|1.|`\=>`|`tag`|`find`|`anon`|[Display Popular Tags](#display-popular-tags)|
|1.|`=>`|`home`|`enter`|`portal`||
|2.|`=>`|`home`|`view`|`portal`||

## Display Recent Articles

|#|flow|Term|Action|Orient|description|
|---|---|----|------|:------:|-----------|
|0.|fetch recent articles|`article`|`find`|`*`|default search|
|1.|`=>`|`article`|`fetch`|`*`||
|2.|`=>`|`article`|`list`|`*`||

## Display User Article Feed

|#|flow|Term|Action|Orient|description|
|---|---|----|------|------|-----------|
|0.|fetch user feed|`article`|`find`|`portal`||
|1.|`=>`|`article`|`fetch`|`portal`||
|2.|`=>`|`article`|`list`|`portal`||

## Display Popular Tags

|#|flow|Term|Action|Orient|description|
|---|---|----|------|:------:|-----------|
|0.|fetch popular tags|`tag`|`find`|`*`||
|1.|`=>`|`tag`|`fetch`|`*`||
|2.|`=>`|`tag`|`list`|`*`||

## Sign Up

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User navigates to Register|`user`|`new`|`anon`|set the URL to `/register`|
|1.|User submits registration form|`user`|`add`|`anon`||
|2.|`:`Failed Add|`user`|`fail`|`anon`|Show Errors `=>1.`|
|2.|`:`No Errors|`user`|`create`|`anon`|create the user in permanent storage|
|3.|`=>`|`user`|`enter`|`portal`||
|4.|`=>`|`home`|`load`|`portal`|[Go to Home Page as Logged in User](#go-to-home-page-as-logged-in-user)|

## Login

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User chooses to Login|`user`|`enter`|`anon`||
|1.|`=>`|`user`|`view`|`anon`|set the URL to `/login`|
|2.|User submits login form|`user`|`locate`|`anon`||
|3.|`:`Failed Login|`user`|`missing`|`anon`|Show Errors|
|3.|`:`Succesful Login|`user`|`retrieve`|`portal`||
|4.||`user`|`enter`|`portal`||
|5.|`=>`|`home`|`load`|`portal`|[Go to Home Page as Logged in User](#go-to-home-page-as-logged-in-user)|

## Logout

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User chooses to Logout|`user`|`leave`|`portal`|remove any identity|
|1.|`=>`|`home`|`load`|`anon`|[Go to Home Page as Anonymous in User](#go-to-home-page-as-anonymous-user)|

## Edit Profile

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User chooses to Edit Profile|`user`|`edit`|`portal`|set the URL to `/settings`|
|1.|User submits user form|`user`|`update`|`portal`||
|2.|`:`Failed Update|`user`|`fail`|`anon`|Show Errors|
|2.|`:`Succesful Login|`user`|`save`|`portal`|store changes in permanent store|
|3.|`=>`|`home`|`load`|`portal`|[Go to Home Page as Logged in User](#go-to-home-page-as-logged-in-user)|

## Create Article

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User chooses New Article|`article`|`new`|`portal`|set the URL to `/editor`|
|1.|User submits Article form|`article`|`add`|`portal`||
|2.|`:`Failed Add|`article`|`fail`|`portal`|Show Errors|
|2.|`:`No Errors|`article`|`create`|`portal`|create the article in permanent storage|
|3.|`=>`|`article`|`load`|`portal`|[Display Article Logged In](#display-article-logged-in)|

## Edit Article

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User edits Article|`article`|`edit`|`portal`|set the URL to `/editor/:slug`|
|1.|User submits Post form|`article`|`update`|`portal`||
|2.|`:`Failed Add|`article`|`fail`|`portal`|Show Errors|
|2.|`:`No Errors|`article`|`save`|`portal`|update the article in permanent storage|
|3.|`=>`|`article`|`load`|`portal`|[Display Article Logged In](#display-article-logged-in)|

## Read Article Anonymously

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User selects an article to read|`article`|`select`|`anon`||
|1.||`article`|`locate`|`anon`||
|2.|`:`Article not found|`article`|`missing`|`anon`|Show Missing|
|2.|`:`Article found|`article`|`retrieve`|`anon`||
|3.|`=>`|`article`|`load`|`anon`|[Display Article Anonymously](#display-article-anonymously)|

## Display Article Anonymously

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|`=>`|`article`|`load`|`anon`||
|1.|`\=>`|`comment`|`find`|`portal`|[Display Article Comments](#display-article-comments)|
|2.|`=>`|`article`|`enter`|`anon`|set the URL to `/article/:slug`|
|3.|`=>`|`article`|`view`|`anon`|User sees article page|

## Read Article Logged In

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User selects an article to read|`article`|`select`|`portal`||
|1.||`article`|`locate`|`portal`||
|2.|`:`Article not found|`article`|`missing`|`portal`|Show Missing|
|2.|`:`Article found|`article`|`retrieve`|`portal`||
|3.|`=>`|`article`|`load`|`portal`|[Display Article Logged In](#display-article-logged-in)|

## Display Article Logged In

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|`=>`|`article`|`load`|`portal`||
|1.|`\=>`|`comment`|`find`|`portal`|[Display Article Comments](#display-article-comments)|
|2.|`=>`|`article`|`enter`|`portal`|set the URL to `/article/:slug`|
|3.|`=>`|`article`|`view`|`portal`|User sees article page w options:<br/>[Comment on Article](#comment-on-article),<br/>[Delete Article Comment](#delete-article-comment),<br/>[ [Favorite Article](#favorite-article) OR [Unfavorite Article](#unfavorite-article) ]|

## Display Article Comments

|#|flow|Term|Action|Orient||
|---|---|----|------|:------:|-----------|
|0.||`comment`|`find`|`*`||
|1.|`=>`|`comment`|`fetch`|`*`||
|2.|`=>`|`comment`|`list`|`*`||
|3.|`=>`|`comment`|`browse`|`*`||

## Comment on Article

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|Submit comment form|`comment`|`add`|`portal`||
|1.|`=>`|`comment`|`create`|`portal`|add comment to persistent store|
|2.|`=>`|`comment`|`load`|`portal`||
|3.|`=>`|`comment`|`view`|`portal`|option:<br/>[Delete Article Comment](#delete-article-comment)|

## Delete Article Comment

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|Delete comment|`comment`|`delete`|`portal`||
|1.|`=>`|`comment`|`remove`|`portal`|remove comment from persistent store|

## Favorite Article

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User favorites article|`article_user`|`add`|`portal`||
|1.|`=>`|`article_user`|`create`|`portal`|add favorite relationship to persistent store|
|2.|`=>`|`article_user`|`load`|`portal`|option:<br/>[Unfavorite Article](#unfavorite-article)|

## Unfavorite Article

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User unfavorites article|`article_user`|`delete`|`portal`||
|1.|`=>`|`article_user`|`remove`|`portal`|remove favorite relationship from persistent store|
|2.|`=>`|`article_user`|`missing`|`portal`|option:<br/>[Favorite Article](#favorite-article)|

## View Profile Anonymously

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User selects a User Profile|`profile`|`select`|`anon`||
|1.||`profile`|`locate`|`anon`||
|2.|`:`Profile not found|`profile`|`missing`|`anon`|Show Missing|
|2.|`:`Profile found|`profile`|`retrieve`|`anon`||
|3.|`=>`|`profile`|`load`|`anon`|[Display Profile Anonymously](#display-profile-anonymously)|

## Display Profile Anonymously

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|`=>`|`profile`|`load`|`anon`||
|1.|`\=>`|`profile_article`|`find`|`portal`|[Display Profile Articles](#display-profile-articles)|
|2.|`=>`|`profile`|`enter`|`anon`|set the URL to `/@:profile_name`|
|3.|`=>`|`profile`|`view`|`anon`|User sees profile page w option:<br/>[Read Article Anonymously](#read-article-anonymously)|

## View Profile Logged In

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User selects a user profile|`profile`|`select`|`portal`||
|1.||`profile`|`locate`|`portal`||
|2.|`:`Profile not found|`profile`|`missing`|`portal`|Show Missing|
|2.|`:`Profile found|`profile`|`retrieve`|`portal`||
|3.|`=>`|`profile`|`load`|`portal`|[Display Profile Logged In](#display-profile-logged-in)|

## Display Profile Logged In

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|`=>`|`profile`|`load`|`portal`||
|1.|`\=>`|`profile_article`|`find`|`portal`|[Display Profile Articles](#display-profile-articles)|
|2.|`=>`|`profile`|`enter`|`portal`|set the URL to `/article/:slug`|
|3.|`=>`|`profile`|`view`|`portal`|User sees profile page w options:<br/>[Read Article Logged In](#read-article-logged-in),<br/>[ [Follow Profile](#follow-profile) OR [Unfollow Profile](#unfollow-profile) ]|

## Display Profile Articles

|#|flow|Term|Action|Orient||
|---|---|----|------|:------:|-----------|
|0.||`profile_article`|`find`|`*`||
|1.|`=>`|`profile_article`|`fetch`|`*`||
|2.|`=>`|`profile_article`|`list`|`*`||
|3.|`=>`|`profile_article`|`browse`|`*`||

## Follow Profile

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User follows profile|`profile_user`|`add`|`portal`||
|1.|`=>`|`profile_user`|`create`|`portal`|add follow relationship to persistent store|
|2.|`=>`|`profile_user`|`load`|`portal`|option:<br/>[Unfollow Profile](#unfollow-profile)|

## Unfollow Profile

|#|flow|Term|Action|Orient||
|---|---|----|------|------|-----------|
|0.|User unfollows profile|`profile_user`|`delete`|`portal`||
|1.|`=>`|`profile_user`|`remove`|`portal`|remove follow relationship from persistent store|
|2.|`=>`|`profile_user`|`missing`|`portal`|option:<br/>[Follow Profile](#follow-profile)|
