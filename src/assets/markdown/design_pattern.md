# 软件开发-设计模式

>更新于2022年7月19日

`设计模式`是软件开发人员在软件开发过程中面临的一般问题的解决方案。 这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。 设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。 使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。

## 设计模式原则

- 降低复杂度
- 降低耦合性：耦合度越大，当一个类发生改变时，对另一个类的影响也越大。
- 增加稳定性

#### 单一原则

简单地说就是`一个类只做一件事`，这个设计原则备受争议却又极其重要。每个类都有比较单一的职责，软件设计真正要做的许多内容，就是发现职责并把那些职责相互分离，就是抽象的能力。注意，单一职责原则并不是一个类只能有一个函数，而是说这个类中的函数所做的工作是高度相关的，也就是高内聚。

优点：

- 类的复杂性降低，实现什么职责都有清晰明确的定义。
- 可读性提高，复杂性降低，那当然可读性提高了。
- 可维护性提高，可读性提高了，那当然更容易维护了。
- 变更引起的风险降低，变更是必不可少的，如果接口的单一职责做得好，一个接口修改只对应的实现类有影响，对其他的接口无影响，这对系统的扩展性、维护性都有非常大的帮助。

#### 开闭原则

开闭原则的意思是：`对扩展开放，对修改关闭`。一个软件实体类，模块和函数应该对扩展开放，对修改关闭。在软件的生命周期内，因为变化、升级和维护等原因，需要对软件原有的代码进行修改时，可能会给旧代码引入错误。因此，当软件需要变化时，我们应该尽量通过扩展的方式来实现变化，而不是通过修改已有的代码来实现。想要达到这样的效果，我们需要使用接口和抽象类。

#### 里氏替换原则

里氏替换原则本质就是`继承`、`多态`的应用。里氏替换原则通俗的来讲就是：`子类可以扩展父类的功能，但不能改变父类原有的功能`。如果一个类被其他的类所`继承`或`依赖`，则当这个类需要修改时，必须考虑到所有的`子类、被依赖项`，并且父类修改后，所有涉及到子类的功能都有可能会产生故障。 

- 子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法。
- 子类中可以增加自己特有的方法。
- 当子类的方法重载父类的方法时，方法的参数类型要比父类方法的参数类型更宽松（接口）。
- 当子类的方法实现父类的抽象方法时，方法的返回值要比父类更严格（接口实现类）。

#### 依赖倒置原则

抽象不应该依赖细节，细节应该依赖于抽象，说白了，就是要针对接口编程，不要对实现编程。

传递依赖关系有三种方式，以上的例子中使用的方法是接口传递，另外还有两种传递方式：构造方法传递和 setter 方法传递，相信用过 Dagger、Spring 框架的，对依赖的传递方式一定不会陌生。 在实际编程中，我们一般需要做到如下：

- 低层模块尽量都要有抽象类或接口，或者两者都有。
- 变量的声明类型尽量是抽象类或接口。
- 使用继承时遵循里氏替换原则。 依赖倒置原则的核心就是要我们面向接口编程。

#### 接口隔离原则

接口隔离原则注重对接口依赖的隔离，没有客户(client)应该被迫依赖于它不使用方法。接口隔离原则拆分非常庞大臃肿的接口成为更小的和更具体的接口，这样客户将会只需要知道他们感兴趣的方法。

- 接口尽量小，但是要有限度。对接口进行细化可以提高程序设计灵活性是不挣的事实，但是如果过小，则会造成接口数量过多，使设计复杂化。所以一定要适度。
- 为依赖接口的类定制服务，只暴露给调用的类它需要的方法，它不需要的方法则隐藏起来。只有专注地为一个模块提供定制服务，才能建立最小的依赖关系。
- 提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情。 运用接口隔离原则，一定要适度，接口设计的过大或过小都不好。设计接口的时候，只有多花些时间去思考和筹划，才能准确地实践这一原则。

#### 最少知识原则

一个实体应当尽量少地与其他实体之间发生相互作用，使得系统功能模块相对独立。a.b.Method()违反了此定律，而a.Method()不违反此定律。一个简单例子是，人可以命令一条狗行走（walk），但是不应该直接指挥狗的腿行走，应该由狗去指挥控制它的腿如何行走。一个类应该对自己需要耦合或者调用的类知道得最少，这有点类似于接口隔离原则中的最小接口的概念。

---

## 依赖注入

所谓[依赖注入](https://zh.m.wikipedia.org/zh-hans/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)，是指程序运行过程中，如果需要调用另一个对象协助时，无须在代码中创建被调用者，而是依赖于外部的注入。

#### Android 使用 Hilt 实现依赖项注入

[Dagger](https://developer.android.com/training/dependency-injection/dagger-basics?hl=zh-cn) 是由 Google 开源用于Java 和 Android 的依赖注入的编译时框架，之后 Google 基于 Dagger 推出了更适合Android 使用的依赖项注入库 [Hilt](https://developer.android.com/training/dependency-injection/hilt-android?hl=zh-cn)。

Hilt 通过为项目中的每个 Android 类提供容器并自动管理其生命周期，提供了一种在应用中使用 DI（依赖项注入）的标准方法。

请参阅 [Hilt Android 开发者指南](https://developer.android.com/training/dependency-injection/hilt-android?hl=zh-cn)。

### Android 手动依赖项注入 

Android 推荐应用架构建议将代码划分为多个类，以从分离关注点这一原则中受益：`Activity` 依赖 `ViewModel` 依赖 `Repository` 依赖 `LocalDataSource` 、`RemoteDataSource`。

该流程如下所示：

<p class="code_title">📄 LoginActivity</p>

```kotlin
class LoginActivity: AppCompatActivity() {

    private lateinit var loginViewModel: LoginViewModel

     override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            // 在这里创建了所有依赖

            val retrofit = Retrofit.Builder()
                .baseUrl("https://example.com")
                .build()
                .create(LoginService::class.java)

            val remoteDataSource = UserRemoteDataSource(retrofit)
            val localDataSource = UserLocalDataSource()

            val userRepository = UserRepository(localDataSource, remoteDataSource)

            loginViewModel = LoginViewModel(userRepository)
     }
}
```

这种方法存在以下问题：

1. 有大量样板代码。如需在代码的另一部分中创建另一个 LoginViewModel 实例，则需要使用重复代码。

2. 必须按顺序声明依赖项。必须在 LoginViewModel 之前实例化 UserRepository 才能创建它。

3. 很难重复使用对象。如需在多项功能中重复使用 UserRepository，必须使其遵循单例模式。单例模式使测试变得更加困难，因为所有测试共享相同的单例实例。

#### 使用容器管理依赖项

如需解决重复使用对象的问题，您可以创建自己的依赖项容器类，用于获取依赖项。此容器提供的所有实例可以是公共实例。在该示例中，由于您仅需要 UserRepository 的一个实例，您可以将其依赖项设为私有，并且可以在将来需要提供依赖项时将其公开：


<p class="code_title">📄 AppContainer</p>

```kotlin
class AppContainer {
    private val retrofit = Retrofit.Builder()
                                .baseUrl("https://example.com")
                                .build()
                                .create(LoginService::class.java)

    private val remoteDataSource = UserRemoteDataSource(retrofit)
    private val localDataSource = UserLocalDataSource()

    val userRepository = UserRepository(localDataSource, remoteDataSource)
}
```

由于这些依赖项在整个应用中使用，因此需要将它们放置在所有 Activity 都可以使用的通用位置：`应用类`。创建一个包含 AppContainer 实例的自定义应用类。

<p class="code_title">📄 MyApplication</p>

```kotlin
 class MyApplication : Application() {
    
    val appContainer = AppContainer()
}
```

现在，您可以从应用中获取 AppContainer 的实例并获取共享 UserRepository 实例：

<p class="code_title">📄 LoginActivity</p>

```kotlin
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val appContainer = (application as MyApplication).appContainer
        loginViewModel = LoginViewModel(appContainer.userRepository)
    }
}
```

如果需要在应用的更多位置使用 LoginViewModel，则具有一个可创建 LoginViewModel 实例的集中位置是有必要的。您可以将 LoginViewModel 的创建移至容器，并为工厂提供该类型的新对象。LoginViewModelFactory 的代码如下所示：

<p class="code_title">📄 LoginViewModelFactory</p>

```kotlin
interface Factory {
    fun create(): T
}

class LoginViewModelFactory(private val userRepository: UserRepository) : Factory {
    override fun create(): LoginViewModel {
        return LoginViewModel(userRepository)
    }
}
```

您可以在 AppContainer 中添加 LoginViewModelFactory 并让 LoginActivity 使用它：


<p class="code_title">📄 AppContainer 、📄 LoginActivity</p>

```kotlin
class AppContainer {
        ...
        val userRepository = UserRepository(localDataSource, remoteDataSource)

        val loginViewModelFactory = LoginViewModelFactory(userRepository)
    }

    class LoginActivity: Activity() {

        private lateinit var loginViewModel: LoginViewModel

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            val appContainer = (application as MyApplication).appContainer
            loginViewModel = appContainer.loginViewModelFactory.create()
        }
    }
```

此方法比前一种方法更好，但仍需考虑一些挑战：

1. 您必须自行管理 AppContainer，手动为所有依赖项创建实例。

2. 仍然有大量样板代码。您需要手动创建工厂或参数，具体取决于是否要重复使用某个对象。

#### 管理应用流程中的依赖项

当您具有不同的流程时，您可能希望对象仅位于该流程的范围内。您需要为每个新流程创建一个新实例。

我们将 LoginContainer 添加到示例代码中。您希望能够在应用中创建多个 LoginContainer 实例，因此，请不要将其设为单例，而应使其成为具有登录流程需要从 AppContainer 中获取的依赖项的类。

<p class="code_title">📄 LoginContainer 、📄 AppContainer</p>

```kotlin
class LoginContainer(val userRepository: UserRepository) {

    val loginData = LoginUserData()

    val loginViewModelFactory = LoginViewModelFactory(userRepository)
}

class AppContainer {
    ...
    val userRepository = UserRepository(localDataSource, remoteDataSource)

    var loginContainer: LoginContainer? = null
}

```

拥有某个流程专用的容器后，必须决定何时创建和删除容器实例。

<p class="code_title">📄 LoginActivity</p>

```kotlin
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel
    private lateinit var loginData: LoginUserData
    private lateinit var appContainer: AppContainer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        appContainer = (application as MyApplication).appContainer

        appContainer.loginContainer = LoginContainer(appContainer.userRepository)

        loginViewModel = appContainer.loginContainer.loginViewModelFactory.create()
        loginData = appContainer.loginContainer.loginData
    }

    override fun onDestroy() {
        appContainer.loginContainer = null
        super.onDestroy()
    }
}

```

---

## 创建型设计模式


### 工厂模式

#### 简单工厂模式



### 建造者模式

### 单例模式

### 原型模式



## 结构型设计模式

### 适配器模式

### 组合模式



## 行为型设计模式

### 观察者模式

### 模板方法模式

### 代理模式

### 命令模式

### 状态模式













---

参考文档：

- [Android Developers - 依赖项注入](https://developer.android.com/training/dependency-injection/manual?hl=zh-cn)

- [设计模式原则](https://thinkkeep.github.io/design-patterns/zh/uml/design-principle.html)