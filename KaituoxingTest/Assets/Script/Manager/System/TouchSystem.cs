using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TouchSystem : MonoBehaviour
{
    private static TouchSystem _instance;

    public static TouchSystem Instance
    {
        get { return _instance; }
    }

    void Awake()
    {
        _instance = this;
    }


    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        if (BrickManager.Instance.gamePass)
        {
            return;
        }
        if (Input.anyKeyDown)
        {
            foreach (KeyCode keyCode in System.Enum.GetValues(typeof(GameKeyCode)))
            {
                if (Input.GetKeyDown(keyCode))
                {
                    GameEventManager.Instance.OnKeyDowned(keyCode, GetScreenCoordinates(keyCode));
                }
            }
        }
    }


    public Vector2 GetScreenCoordinates(KeyCode key)
    {
        Vector2 keyboardPosition = KeyCodeToVector2(key);
        // Vector2 screenPixelPosition = new Vector2(Mathf.Lerp(0, Screen.width, keyboardPosition.x),
        //     Mathf.Lerp(0, Screen.height, keyboardPosition.y));

        return keyboardPosition;
    }

    public Vector2 KeyCodeToVector2(KeyCode key)
    {
        switch (key)
        {
            case KeyCode.BackQuote:
                return new Vector2(0, 1);
            case KeyCode.Alpha1:
                return new Vector2(0.07692307692307693f, 1);
            case KeyCode.Alpha2:
                return new Vector2(0.15384615384615385f, 1);
            case KeyCode.Alpha3:
                return new Vector2(0.23076923076923078f, 1);
            case KeyCode.Alpha4:
                return new Vector2(0.3076923076923077f, 1);
            case KeyCode.Alpha5:
                return new Vector2(0.38461538461538464f, 1);
            case KeyCode.Alpha6:
                return new Vector2(0.46153846153846156f, 1);
            case KeyCode.Alpha7:
                return new Vector2(0.5384615384615384f, 1);
            case KeyCode.Alpha8:
                return new Vector2(0.6153846153846154f, 1);
            case KeyCode.Alpha9:
                return new Vector2(0.6923076923076923f, 1);
            case KeyCode.Alpha0:
                return new Vector2(0.7692307692307693f, 1);
            case KeyCode.Minus:
                return new Vector2(0.8461538461538461f, 1);
            case KeyCode.Equals:
                return new Vector2(0.9230769230769231f, 1);
            case KeyCode.Backspace:
                return new Vector2(1, 1);

            default: return Vector2.zero;
        }
    }
}


public enum GameKeyCode
{
    /// <summary>
    ///   <para>The '0' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha0 = 48, // 0x00000030

    /// <summary>
    ///   <para>The '1' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha1 = 49, // 0x00000031

    /// <summary>
    ///   <para>The '2' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha2 = 50, // 0x00000032

    /// <summary>
    ///   <para>The '3' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha3 = 51, // 0x00000033

    /// <summary>
    ///   <para>The '4' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha4 = 52, // 0x00000034

    /// <summary>
    ///   <para>The '5' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha5 = 53, // 0x00000035

    /// <summary>
    ///   <para>The '6' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha6 = 54, // 0x00000036

    /// <summary>
    ///   <para>The '7' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha7 = 55, // 0x00000037

    /// <summary>
    ///   <para>The '8' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha8 = 56, // 0x00000038

    /// <summary>
    ///   <para>The '9' key on the top of the alphanumeric keyboard.</para>
    /// </summary>
    Alpha9 = 57, // 0x00000039

    /// <summary>
    ///   <para>Minus '-' key.</para>
    /// </summary>
    Minus = 45, // 0x0000002D

    /// <summary>
    ///   <para>Equals '=' key.</para>
    /// </summary>
    Equals = 61, // 0x0000003D

    /// <summary>
    ///   <para>The backspace key.</para>
    /// </summary>
    Backspace = 8,
    
    /// <summary>
    ///   <para>Back quote key '`'.</para>
    /// </summary>
    BackQuote = 96, // 0x00000060
}