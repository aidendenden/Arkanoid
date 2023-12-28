using System;
using UnityEngine;

/// <summary>
/// 在这个脚本里的Triggered方法决定传什么
/// </summary>
public class GameEventManager : MonoBehaviour
{
    private static GameEventManager _instance;
    
    public static GameEventManager Instance
    {
        get { return _instance; }
    }
    void Awake()
    {
        _instance = this;
    }
    

    public delegate void TriggerEventHandler(string message, Transform _transform,Vector3 v);

    public static event TriggerEventHandler OnTrigger;
    

    public void Triggered(string message, Transform _transform, Vector3 _vector3)
    {
        Debug.Log("Triggered: " + message);
        if (OnTrigger != null)
            OnTrigger(message, _transform, _vector3);
    }

    public void AddListener(TriggerEventHandler listener)
    {
        OnTrigger += listener;
    }

    public void RemoveListener(TriggerEventHandler listener)
    {
        OnTrigger -= listener;
    }
    private void HandleTrigger(string message,Transform _transform)
    {
        string t = "hello world";
        if (string.Equals(message, t))
        {
            Debug.Log("Trigger event received: " + message, _transform);
        }

    }
    
    
    //键盘输入事件
    public delegate void keyboardEventHandler(KeyCode keyCode,Vector2 vector2);

    public static event keyboardEventHandler OnKeyDown;
    
    public void OnKeyDowned(KeyCode keyCode,Vector2 vector2)
    {
        if (OnKeyDown != null)
            OnKeyDown(keyCode, vector2);
    }

    public void ClearEventListeners()
    {
        // 清空事件监听器
        OnTrigger = null;
        OnKeyDown = null;
    }
}


#region 监听交互的方法

// 以下是监听交互的方法
// void OnEnable()
// {
//    GameEventManager.OnTrigger += HandleTrigger;
// }
//
// void OnDisable()
// {
//      GameEventManager.OnTrigger -= HandleTrigger;
// }
//
//  private void HandleTrigger(string message,Transform _transform)
// {
//     string t = "hello world";
//     if (string.Equals(message, t))
//     {
//         Debug.Log("Trigger event received: " + message, _transform);
//     }
// }

#endregion

#region 以下是使用方法，发送事件

// GameEventManager.Instance.Triggered("to touch",transform);

#endregion


#region Aciton的用法

// class ActionFunction
// {
//     // 在目标脚本中定义带参数的Action
//     public Action<int, string> MyAction;
//     
//     // 定义一个不带参数和返回值的Action
//     Action _myAction = () => {
//         // 这里是Action的具体实现
//         Debug.Log("Action被调用");
//     };
//     
//     // 定义一个带两个整数参数的Action
//     Action<int, float> myAction = (intParam, floatParam) => {
//         // 这里是Action的具体实现
//         Debug.Log("Action被调用，参数为：" + intParam + ", " + floatParam);
//     };
//     
//     public void A()
//     {
//         
//          
//                
//            // 调用Action
//            _myAction();
//                
//                
//            // 定义一个接受Action作为参数的方法
//            void DoSomething(Action action) {
//                // 调用传递进来的Action
//                action();
//            }
//        
//            // 调用方法并传递Action
//            DoSomething(_myAction);
//        
//            // 定义一个接受Action作为回调的方法
//            void PerformTaskWithCallback(Action callback) {
//                // 执行任务
//                Debug.Log("执行任务中...");
//        
//                // 任务完成后调用回调
//                if (callback != null) {
//                    callback();
//                }
//            }
//        
//            // 定义一个回调方法
//            void MyCallback() {
//                Debug.Log("任务完成，回调被调用");
//            }
//        
//            // 调用方法，并传递回调函数
//            PerformTaskWithCallback(MyCallback);
//            
//           
//            
//            // 调用Action并传递参数
//            myAction(10, 3.14f);
//            
//            // 定义一个接受带参数Action的方法
//            void DoSomethingWithParams(Action<int, string> action) {
//                // 调用传递进来的Action，传递参数
//                action(42, "Hello");
//            }
//        
//            // 调用方法并传递带参数的Action
//            DoSomethingWithParams((intParam, stringParam) => {
//                Debug.Log("参数为：" + intParam + ", " + stringParam);
//            }); 
//            
//            // 在某个适当的时机调用Action，并传递参数
//            if (MyAction != null) {
//                int intValue = 10;
//                string stringValue = "Hello";
//                MyAction(intValue, stringValue);
//            }
//     }
// }
//
// class MyClass
// {
//     // 在其他脚本中获取目标脚本的引用
//     public ActionFunction targetScript;
//
//
//     // 订阅或调用目标脚本中的Action
//     void SubscribeToAction() {
//         targetScript.MyAction += MyActionCallback;
//     }
//
//     void MyActionCallback(int intValue, string stringValue) {
//         Debug.Log("接收到参数：" + intValue + ", " + stringValue);
//     }
// }

#endregion