using Xunit.Abstractions;

namespace AdventOfCode2023.Tests.Day08Part01;

public class Day08Part01
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly string _currentDirectory;

    public Day08Part01(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
        _currentDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Tests", "Day08Part01");
    }

    private static string SolverFunction(string rawInput)
    {
        var lines = rawInput.Split("\n");
        throw new NotImplementedException();
    }

    [Fact]
    public void Solve()
    {
        TestUtils.RunAndVerify(SolverFunction, _currentDirectory);
        TestUtils.RunAndRecord(SolverFunction, _currentDirectory, _testOutputHelper);
    }
}