'use strict';

var timeSlots = require('./timeSlots');
var talkTimeSlot = require('./../relations/talk-timeSlot');

var talks = [
  {
    name: 'Welcome to Droidcon London 2014!',
    description: 'Join us for an early breakfast...: and get ready for Barcamp!'
  },
  {
    name: 'Barcamp Kickoff',
    description: 'Get on stage and pitch what you want to talk about at the Barcamp'
  },
  {
    name: 'Coffee Break 1',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'AIDE & Android Wear'
  },
  {
    name: 'Growing momentum for apps on x86'
  },
  {
    name: 'MyAppConverter'
  },
  {
    name: 'Seene 3D Capture'
  },
  {
    name: 'Modern Testing Technologies or how to avoid getting murdered in your sleep by a death goblin'
  },
  {
    name: 'An Android Journey'
  },
  {
    name: 'AST Transformations, How to avoid write less code'
  },
  {
    name: 'Maps n Apps'
  },
  {
    name: 'Coffee Break 2',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'Bitchy App Clinic'
  },
  {
    name: 'TDD Coverage'
  },
  {
    name: 'The Killer design specs'
  },
  {
    name: 'Intel INDIE'
  },
  {
    name: 'Security'
  },
  {
    name: 'Cupboard Persistance'
  },
  {
    name: 'From Legacy Code to Hexagonal Android'
  },
  {
    name: 'Intents system'
  },
  {
    name: 'Lunch 1',
    description: 'Help yourself to lunch and take a closer look at the exhibitions!'
  },
  {
    name: 'Connecting android to a Cloud Backend'
  },
  {
    name: 'AOSP Building Blocks'
  },
  {
    name: 'Build Your Gradle Plugin'
  },
  {
    name: 'Calligraphy – Fonts in styling'
  },
  {
    name: 'Better data transport with Gradle'
  },
  {
    name: 'Things App Developers Do'
  },
  {
    name: 'Gradle'
  },
  {
    name: 'Putting the magic touch on your app with custom views'
  },
  {
    name: 'Coffee Break 3',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'The death of the refresh button'
  },
  {
    name: 'Y U NO CRAFTSMAN!?'
  },
  {
    name: 'Genymotion – The leaked session'
  },
  {
    name: 'Running your own license server'
  },
  {
    name: 'Democamp',
    subtitle: 'YOU can demo your app!: Show off your new idea in front of our panel of investors!',
    description: 'We’re putting you in front of some of the best VC’s, entrepreneurs, and journalists London has to offer. You’ll have 4 minutes to demo your app/service/product, and if our panel of judges like it, you’re in with a chance of some investment!'
  },
  {
    name: 'Practicing Practical Best Practices for Software Development Practitioners'
  },
  {
    name: 'Droidcon Party – Sponsored by ooVoo',
    subtitle: 'Oovoo: invites you for a drink,networking, chats and some fun at the Wenlock and Essex Pub',
    description: 'The Wenlock and Essex can be found at Suncourt House, 18-26 Essex Rd, Islington N1 8LN'
  },
  {
    name: 'Breakfast and Registration',
    description: 'Get ready for the second day of Droidcon London, packed with talks from Android experts!'
  },
  {
    name: 'What’s New in Android',
    description: 'Come find out about the latest developments in Android technologies and APIs.'
  },
  {
    name: 'Coffee Break 4',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'Papercraft: Material design & implementation',
    description: 'A deep dive into the Material design system for both designers and developers. Covering the design principles, applying them to your app and how to build them using the new Andoid-L APIs.'
  },
  {
    name: 'Gradlin’: Plugging it in for build success',
    description: 'Etsy loves Gradle. On the Android team, we use it for all our builds, and have it integrated with our Jenkins / CI jobs to run all of our tests, lints, builds, update version numbers, and deploy our internal releases. Everyone should love Gradle. This talk will get the audience acquainted with the Groovy/Gradle DSL, and then move into some really sweet ways you can clean up and reuse your build code (for multiproject builds and plugins).' +
                 'What this talk will cover:' +
                 'Groovy basics: closures, filtering, variable declaration, classes' +
                 'Gradle primitives: files, tasks, configurations' +
                 'Gradle execution phases: configuration and execution' +
                 'Setting up a multiproject build' +
                 'Writing a Gradle plugin to make reusable build logic: I’ll walk through the process we went through to set up a simple Gradle plugin we use at Etsy to keep our tablet layouts synced across multiple screen resolutions.'
  },
  {
    name: 'Fighting application size with ProGuard and beyond',
    description: 'Apps are getting larger, pushed by ever increasing user expectations. Social media, maps, advertisements,… As a developer, you may add a few libraries, and before you know it, your app is exceeding the constraints of the Android platform. In this presentation, I will discuss the main problems and some solutions. ProGuard, the bytecode optimizer and obfuscator in the Android SDK, is an obvious first step. I will show some optimized configurations that can help you to reduce the size of common libraries. If ProGuard isn’t sufficient, you may have to resort to more drastic techniques, such as dynamic class loading. I’ll discuss some techniques and their implications. I’ll also introduce the new dex splitting feature of our software DexGuard.'
  },
  {
    name: 'Climbing over the Great Wall: Lessons to learn from China’s most successful Android games',
    description: 'With an app market forecast to be worth more than US$1.5 billion in 2015, China is an attractive but elusive market for app developers. Smartphone usage rates are soaring and China sits at number two in the overall app download charts. But it’s a mistake for developers to assume a game that succeeded with a Western audience will become an instant success in China – in fact, it’s often the case that the biggest Western games hardly make a dent in the Chinese market.' +
                 '\nChris Hanage, General Manager of Papaya Mobile and AppFlood for EMEA will analyse 10 successful games in China over the past 6-12 months, explaining why they succeeded and what inspiration they can give to Western developers hoping to increase their chances of successfully marketing their games in China.' +
                 '\nUsing case studies of real games launched in China, Chris’ presentation will give developers important insight into cultural differences relating to gameplay, graphics, content, imagery, in-game milestones, app size and monetisation strategies to be considered when planning and developing their app for a Chinese audience.'
  },
  {
    name: 'Video Streaming: from the native Android player to uncoventional devices',
    description: 'Getting a streaming video in your Android smartphone or tablet is no longer enough.In the latest period, Google shows how to push this concept forward to new appliances. Chromecast and Android TV are two of the most promising gadgets for upsetting the way users enjoy video streaming.' +
                 '\nThis talk we’ll give you an overview about the streaming in Android. Starting from video streaming on mobile devices, we will guide you into the evolution of the development through Chromecast up to Android TV. Matteo Bonifazi and Alessandro Martellucci will be illustrating this talk with their experiences developing mobile television applications for the main Italian broadcaster providers.'
  },
  {
    name: 'Dear developers, design details matter',
    description: 'Android finally has established design guidelines and widely used UI design patterns. Android users understand functionality of components like the navigation drawer, action bar, sharing and many more. However, the guidelines are just that, guidelines, not rules.' +
                 '\nAll Android apps should not look alike but neither should they all reinvent all the controls. In this presentation Juhani will take a deep dive into details of the common design patterns and how they can be customised without compromising usability.' +
                 '\nI want to help developers and designers alike to understand how to correctly use Android UI design patterns.'
  },
  {
    name: 'Engineering for Android scale at SoundCloud',
    description: 'The SoundCloud app has been installed by tens of millions of users and our Android team has tripled in size over the last year. We want to share the engineering practices that we’ve come to value as our team, user base and codebase has grown. The cornerstone of our Android architecture is RxJava, We’ll talk about how it fits into our codebase and show some examples of the problems we’ve used it to solve.'
  },
  {
    name: 'Size does not matter, 2.83 inches is enough',
    description: 'An exciting talk from David Gonzalez of Novoda. Stay tuned for more details!'
  },
  {
    name: 'Connect your mobile apps to the cloud the easy way',
    description: 'The best apps are connected to the cloud. Find out how with Microsoft’s Azure you can add the backend capabilities you need, including offline data sync, push notifications, authentication, to your Android apps in minutes.  Join us for an entertaining demo involving Lua, Node.js, and Azure Mobile Services. Learn more about what makes Azure a different, better choice for your apps. There’ll be very few slides, plenty of demos… open to both novice and experienced developers.'
  },
  {
    name: 'Going beyond smartphones',
    description: 'This session will walk through the ever accelerating human innovation over the last 8000 years – and from that extrapolate likely scenarios for our near future. Beyond smartphones we find SmartWear and Internet of Things, and an unmatched effort in decentralised creation. We will go into detail on Sony SDKs and technology behind SmartEyeglass, SmartBand, SmartWatch and Wi-Fi controlled cameras.'
  },
  {
    name: 'Coffee Break 5',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'The Importance of Feedback in User Interface Design',
    description: 'One of the elements that most of the designers and developers tend to forget is the feedback – and every single feedback crafted in the app plays a important role (or more) in minimizing user frustration and turn that into good user experience, regardless its effect size. Join this session to discover (or re-discover) the importance of feedback in interface design which can definitely help in crafting the next awesome app in the Play Store!'
  },
  {
    name: 'If I can, you can too – Animations for developers',
    description: 'You don’t need to be a designer to use Animations to increase your app Experience, with better Feedback, smooth transitions, cal the user attention to important actions.' +
                 '\nThis talk shows why you should use Animations, and how to achieve this without too much work.'
  },
  {
    name: 'How to Build a One Man Band',
    description: 'Releasing and marketing quality games as a solo developer is a challenging undertaking, but as breakout hits like Thomas Was Alone, Retro City Rampage and Minecraft show, entirely achievable. Access to high quality tools, digital distribution and the ability to develop for multiple platforms has made solo game development more accessible than ever before. Using his trademark humour, Nicoll describes the challenges and obstacles facing solo developers and shares his methodologies and top tips for running a successful studio compromised of one single employee.'
  },
  {
    name: 'Death to Passwords',
    description: 'User authentication in mobile apps is a very common and integral use case. Implementing regular passwords is an easy solution but comes with several pitfalls that impair user experience.' +
                 '\nIn this talk the security flaws and UX implications of passwords will be discussed and highlighted which different techniques exist that are able to offer a more mobile friendly flow. Highlighting authorization and authentication techniques like OAuth, OpenID Connect and even hardware features like Bluetooth Low Energy this talk will be interesting for anyone who’s facing a situation where creating and storing user accounts matters.'
  },
  {
    name: 'Using the Android NDK',
    description: 'The Android NDK is used to integrate C/C++ code into Android applications and libraries.' +
                 '\nLearn how you can use the NDK with Eclipse and Android Studio, and how having native libraries impacts the distribution of apps on the Play Store.' +
                 '\nDiscover what changes from the new Android Runtime may break your integration, and how you can target new 64-bit architectures and android L-release.'
  },
  {
    name: 'Lunch 2',
    description: 'Help yourself to lunch and take a closer look at the exhibitions!'
  },
  {
    name: 'Introduction to Android Wear – A Glimpse Into the Future',
    description: 'The recent unveiling of Android Wear introduced a brand new set of challenges and opportunities for application designers and developers. Indeed, wearable computing requires designers to think in a radically different manner while offering tremendous new ways to improve people lives. This session acts as a complete overview of the new Android Wear ecosystem and explains how developers can push their existing apps to the wearable level from both a designer and a developer perspective.'
  },
  {
    name: 'Graphical Magic',
    description: 'The android.graphics APIs contain some useful tools which enable us to perform some tricks more commonly associated with Photoshop or Gimp. It is not always possible to use such tools, particularly when images are being loaded dynamically from external sources.' +
                 '\nMark Allison, author of http://blog.styling android.com , will explore these APIs and shows you get some amazing results by dynamically altering images in your app'
  },
  {
    name: 'Testing applications at Facebook',
    description: 'How do Facebook engineers ship features to a billion people every two weeks? Learn how we continuously test mobile applications. We will also talk about stress testing and how to measure the impact of code changes on performance.'
  },
  {
    name: 'Android Key Management',
    description: 'The talk will cover several aspects related to security issues concerning the “Key Management” for Android apps.' +
                 '\nIn the first part of the talk, various scenarios will be analyzed where it is necessary to protect the data used by an application, followed by a theoretical introduction of the possible techniques available for protecting data using symmetric and asymmetric key cryptosystems.' +
                 '\nThe talk will continue with the description and the implementation of some key management techniques used for storing securely encryption keys for symmetric algorithms, taking into account any interaction with the end user.' +
                 '\nThe final part of the talk will deal with the analysis of the tools provided by Android for the management of private keys and their certificates used in asymmetric algorithms, such as the KeyChain and the new “Android Key Store” , which is available from version 4.3.'
  },
  {
    name: 'Designing Accessible Android Applications',
    description: 'Integrating accessibility features into new or existing applications to make it stand out and reachable to more users.' +
                 '\nThe session will cover: ' +
                 '\n- Importance of accessibility while designing an application.' +
                 '\n– Android’s built-in accessibility features and its evolution in different Android versions. This will include Android’s built in – support for touch, speech and many other features that can be incorporated to make an application more accessible.' +
                 '\n– Deep dive into few of the available features like sensors, haptics, and gestures that will make the application stand out and – be more accessible.' +
                 '\n– Code examples explaining accessibility features.' +
                 '\n- Tips to add common useful effects that goes a long way in creating a compelling User Interface.'
  },
  {
    name: 'Fun with Custom Layouts',
    description: 'If you ever built an Android app, you have definitely used some of the built-in layouts available in the platform—RelativeLayout, LinearLayout, FrameLayout, etc. They are our bread and butter for building Android UIs. The built-in layouts combined provide a powerful toolbox for implementing complex UIs. But there will still be cases where the design of your app will require you to implement custom layouts.' +
                 '\nIn this talk, Lucas will go through different techniques for implementing custom layouts on Android: from the simple composite views to the most complex flat layout views as well as custom view recycling layouts'
  },
  {
    name: 'Rx-Fy all the things!',
    description: 'Ever had to deal with terribly designed API or spent hours re-factoring your code to deal with an updated API? You’ve heard about RxJava but can’t see how it could benefit your project?' +
                 '\nThis talk will take the practical approach of a complex API to explain how RxJava and Functional Reactive Programming (FRP) can be used on every project to make your life easier.'
  },
  {
    name: 'Reversing Engineering Android applications (and protecting them)',
    description: 'Although hard to see at a first sight, Android applications are not completely safe – with appropriate techniques they can be reverse engineered, and the insights can be accessible by any person with the right knowledge.' +
                 '\nThrough those techniques all the valuable data from the application can be accessed – not only graphical resources, but also secret tokens, HTTP address used for connecting our own web services, passwords, algorithms, etc. Creating safe applications and knowing which techniques will prevent unauthorized access to the source code and our resources is a must nowadays. This workshop will present three use cases on how applications can be reverse engineered. First, a single application will be decompiled, modifications will be applied on its source code, and we will see how this application can be compiled again. Secondly, we will show how we can extract from a crackme key information, such as the algorithm used to validate a key.' +
                 '\nLast, we will see a real case of reverse engineering of an application: how can we make a real code injection within an existing application. The second part will show which tools and techniques can be used to prevent attacks. ProGuard will be introduced as the main tool to obfuscate our code, but also some general good programming and developing practices will be introduced. The attendee will be familiar after this class also with techniques to protect stored data and to secure server interactions.'
  },
  {
    name: 'How to improve android app performance with the new ART Runtime and Dalvik VM',
    description: 'Even with the introduction of the new ART runtime replacing Dalvik VM our android apps are still build in Java.' +
                 '\nWe know one of the main characteristics of Java is portability, and that usually means it is not as efficient as it should be. That might be the reason Java has never been associated with high performance, but nowadays there are a lot of Java powered devices in the world and lots of people are building applications for them.' +
                 '\nCompilers that produce native machine code do a great optimisation job because they know where the code is going to be executed. But because of the portability feature, the Java Compiler could not assume anything about where our program is going to run and leaves all the optimisations to be done by the JVM while loading or, even, running our code (or converting it to native code in the case of ART)' +
                 '\nHaving that in mind, we will explore what can be done to help the compiler produce optimal code which, in fact, will make the life easier of the Dalvik VM or ART.' +
                 '\nIn this session you will not only learn how to make your Android code faster but also what to avoid when looking for critical performance and a bigger understanding of how the Java compiler works, and how these small changes affect to Dalvik VM and the new ART runtime.'
  },
  {
    name: 'Responsive Game Design: Bringing Desktop and Mobile Games to the Living Room',
    description: 'Gone are the days where you can make an app or game and publish it to a single platform expecting a sure fire success. The best way to solve this problem is something I call “responsive game design” based on the same principles that work so well in responsive design for web apps. This framework includes the following key principles:  graphics and UI support multiple resolutions, game mechanics work across multiple types of input, publish to multiple platforms with the same codebase, and saved data is synced across all platforms.  During this talk we’ll cover how to apply this strategy to your own apps and games enabling them to scale across desktop, mobile, tablet and even TV.' +
                 '\nWe’ll walk you through controller support for a game scenario (buttons and analog sticks), controller support for UI (selection, moving between menu items, invoking the keyboard), and how to account for the form factor (overscan, landscape, device and controller detection). By the end of this session, you’ll be able to understand what you need to do if you want to build or modify your own app to work on a TV.'
  },
  {
    name: 'Coffee Break 6',
    description: 'Take a break between talks and chat to other developers!'
  },
  {
    name: 'Getting By With Less Than 1.21 Gigawatts (“Project Volta”)',
    description: 'We never seem to have enough power. Users wail and gnash their teeth over how frequently they have to charge their devices, or tear out their hair when their device runs out of battery at inopportune moments.' +
                 '\nAnd we’re to blame for some of that. In this presentation, we will look at Project Volta, Google’s initiative to help reduce the power consumption of Android and its apps. We will look at the new battery event history that we have access to in the “L” Developer Preview and will see what coding antipatterns look like in that history. We will also discuss the “L” JobScheduler, a way for you to do recurring work in ways that are more friendly to the user’s battery. Note that this talk is BYOFC (Bring Your Own Flux Capacitor).'
  },
  {
    name: 'Fun with Android Shaders and Filters',
    description: 'What does it take to make an app from good to great? Attention to detail. In this session we will dive into advanced techniques to customize Paint, the core of Android rendering. With Shaders and Filters, you can fine tune the look-and-feel of your app and delight your user with a polished UI.'
  },
  {
    name: 'How to build rock-solid apps and keep 100M+ users happy',
    description: 'Shazam is a very popular audio recognition app. It is installed on 100M+ Android devices and it’s growing rapidly. In this talk, we will address how we made the release schedule faster, more predictable and with more features by using BDD and automation testing.' +
                 '\nWe’ll demonstrate how that can be done without slowing down or hindering the development process and why our developers actually find writing tests is fun. Finally, we’ll look at how our testing strategy has translated to our testing framework and hardware infrastructure.'
  },
  {
    name: 'It’s not a bug, it’s a feature',
    description: 'The Android platform consists of a huge amount of code. With so much code, it is not uncommon that bugs and unexpected behaviour occurs. In this session Erik Hellman will explain some of the more interesting bugs and API behaviours that are present and how to deal with them. From subtle UI glitches, concurrency issues, the 64k method limit and more, this session will save you lots of time once you run into these bugs.'
  },
  {
    name: 'Creating the Internet of My Things with Bluetooth Smart',
    description: 'Over 10 billion devices which use Bluetooth were shipped in the technology’s first 10 years. But last year alone, a further 2.5 billion new Bluetooth devices materialised. Bluetooth is going through what has been described as “quiet revolution”, with massive and increasing levels of adoption driven by the release of the latest versionofBluetooth called “Bluetooth Smart”.  Bluetooth Smart enablessome exciting and very current technology trendssuch as IoT (Internet of Things), Wearable Technology and Beacons.' +
                 '\nAndroid developers have excellent Bluetooth Smart APIs at their disposal and “L” looks set to add even greater power and flexibility, with some great new features.' +
                 '\nIn this session you will learn about the fundamental concepts and architecture of Bluetooth Smart and how to create Android apps which exploit it. There will be slides. There will be code.'
  },
  {
    name: 'Deep Dive into the Gradle-based Android Build System',
    description: 'This talk will provide an in-depth tour of the new Gradle-based Android build system. The Gradle-based Android build system has been designed to elegantly deal with the diversity of the Android ecosystem and the demands of modern development practices. We will go through its concepts and features such as variant support and a completely new and powerful dependency management.' +
                 '\nThe new Android build system is also a key component to the Android Studio and to Continuous Integration. We will show how this makes Android Studio much more powerful than other Android IDEs. We will also discuss how the build system can be leveraged to build powerful CI solutions and how to integrate it into larger enterprise build processes.' +
                 '\nWe will round off the talk with other new highlights that have been introduced recently or that are currently being worked on.'
  },
  {
    name: 'Framing the Canvas',
    description: 'This talk will guide you through a topic that is often ignored: the Canvas API. Even if there’s only scarce documentation for it, the Canvas API is at the heart of everything that shows a UI on Android. You’ll need to tame this powerful and mysterious creature if you want to create great custom views and brilliant, lightweight UIs for your apps.' +
                 '\nWhat is a Canvas? How do you Paint? Can you draw Paths? What is Skia, and who invited it anyway? What actually happens during a drawing pass? What are Shaders? What are Filters? Is it true that text is basically impossible to measure correctly? What shape does a Shape have if noone’s painting it? These and other questions will get an answer during this session. Well, some of them will not, probably.' +
                 '\nConnect the dots in the spotty documentation the Android team has assembled, and become a true pixel pusher!'
  },
  {
    name: 'Playing outside the sandbox – Developing on CyanogenMod',
    description: 'This talk will explore what developers can get out of using the CyanogenMod platform and why so many users choose to run CyanogenMod over the OS that is shipped on their devices.' +
                 '\nWhether you want to play with private APIs, test against real devices at a fraction of the cost, or make your own developer preview of the latest AOSP code, CyanogenMod provides an open platform for developers to expand and enhance all aspects of their app development workflow on a multitude of devices.'
  },
  {
    name: 'What’s new in Android Testing',
    description: 'Join Stephan Linzner for an exciting talk – stay tuned for more details!'
  },
  {
    name: 'Android Industrial Mobility',
    description: 'Best Practices to use new technologies to solve old problems' +
                 '\nLarge retailers were already using mobile computers with barcode scanners and Wireless networks in the 80s. During the last 30 years they have used custom HW running different versions of DOS, PalmOS, PocketPC, Windows CE, Windows Mobile and Windows Embedded Handheld on Rugged PDAs and Smartphones.' +
                 '\nNow it’s time to migrate to someting new, to Android. In this talk I will present what are the biggest surprises that these old time mobility users are going to face and how we can help them to embrace, extend and enjoy the power of Android. To Android developers and entrepreneurs this talk will explain what are the best practices that the Industrial Mobility field has collected over 30 years of history:' +
                 '\n- Think about deployment at design stage ' +
                 '\n- IT Friendly is as important as User Friendly' +
                 '\n- Why a solution that is good for the consumer market is not good enough for Industrial Mobility. ' +
                 '\n- Acknowledge that your solution is going to survive some generations of Mobile devices (and maybe OSes)'
  },
  {
    name: 'Closing Ceremony',
    description: 'Say goodbye to Droidcon London for another year.'
  }
];

var findTimeSlotByName = function(name) {
  for (var i in timeSlots) {
    if (timeSlots[i].name === name) {
      return timeSlots[i];
    }
  }
};

talks.forEach(function(talk) {
  var timeSlotName = talkTimeSlot[talk.name];
  var timeSlot = findTimeSlotByName(timeSlotName);
  talk.startDate = timeSlot.startDate;
  talk.endDate = timeSlot.endDate ? timeSlot.endDate : null;
});

module.exports = talks;
